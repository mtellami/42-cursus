import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { PrismaService } from "src/common/prisma/prisma.service";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { HttpService } from "@nestjs/axios";
import { map } from "rxjs/operators";
import { newJwtUser } from "datatype/jwt.user.dto";
import { generateRandomNameSuffix } from 'src/common/utils/string-utils';
import { authenticator } from "otplib";

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService, private jwt: JwtService,
                private configService: ConfigService, private httpService:  HttpService) {}

    async login(code: string): Promise<any> {
        if (!code) {
            throw new BadRequestException('Please Authorize to login');
        }
        const { user_data } = await this.getUserDataFrom42api(code);

        const account = await this.prisma.account.findUnique({
            where: {
                intraId: user_data.id,
            },
            select: {
                id: true,
                isTwofaEnabled: true,
            },
        });
        if (account) {
            const token: string = this.jwt.sign(newJwtUser(account.id, account.isTwofaEnabled));
            return { token, twofa: account.isTwofaEnabled, signup: false };
        }
        
        const name = await this.generateRandomName(user_data.login);
        const user = await this.prisma.user.create({
            data: {
                name: name,
                avatar: user_data.image.versions.small,
                account: {
                    create: {
                        intraId: user_data.id,
												coalition_name: 'Bios',
                        coalition_image_url: '',
                        coalition_cover_url: '',
                        coalition_slug: '',
                    },
                },
            },
            select: {
                id: true,
            },
        });
        const token: string = this.jwt.sign(newJwtUser(user.id, false));
        return { token: token, twofa: false, signup: true };
    }

    async verifyTwofaLogin(userid: string, code: string): Promise<string> {
        const account = await this.prisma.account.findUnique({
            where: {
                id: userid,
            }
        });
        this.verifyTwofaLoginAuthenticator(account.twofaSecret, code);
        return this.jwt.sign(newJwtUser(userid, false));
    }

    /* **********************   Private Methods    ******************************** */
    private async getUserDataFrom42api(code: string): Promise<any> {
        const client_id = this.configService.get('FORTY_TWO_CLIENT_ID');
        const client_secret = this.configService.get('FORTY_TWO_CLIENT_SECRET');
        const host_uri = this.configService.get('HOST_URI');

        try {
            const { access_token } = await this.httpService.post('https://api.intra.42.fr/oauth/token', {
                                client_id,
                                client_secret,
                                code,
                                redirect_uri: `${host_uri}/login`,
                                grant_type: 'authorization_code',
            }).pipe(map(response => response.data)).toPromise();

            const user_data = await this.httpService.get('https://api.intra.42.fr/v2/me', {
                headers: {
                    'Authorization': `Bearer ${access_token}`,
                }
            }).pipe(map(response => response.data)).toPromise();

            return { user_data };
        } catch {
            throw new UnauthorizedException('Please authorize to connect api.42.fr for logging.');
        }
    }

    private async generateRandomName(login: string): Promise<string> {
        let name: string;
    
        for (let i = 0; i < 3; ++i) {
            name = login + generateRandomNameSuffix(4 * i);
            if (await this.prisma.user.findUnique({ where: { name }})) {
                continue;
            }
            return name;
        }
        throw new BadRequestException("Can't create user, please try later");
    }

    private verifyTwofaLoginAuthenticator(secret: string, code: string): void {
        const isMatch: boolean = authenticator.verify({ token: code, secret });
        if (!isMatch) {
            throw new BadRequestException('operation failed: invaid code');
        }
    }
}
