import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/common/prisma/prisma.service";
import { Account } from "@prisma/client";
import { authenticator } from "otplib";
import { toDataURL } from 'qrcode';

@Injectable()
export class TwofaService {
    constructor(private prisma: PrismaService) {}
    
    async enable(userid: string): Promise<string> {

        const account = await this.prisma.account.findUnique({
            where: {
                id: userid,
            },
            include: {
                owner: {
                    select: {
                        name: true,
                    },
                },
            },
        });
        if (account.isTwofaEnabled) {
            throw new BadRequestException('two factor authentication allready enabled');
        }
        return await this.secretAndQrCodeGenerator(account);
    }

    async verifyEnableCode(userid: string, code: string): Promise<void> {
        
        const account = await this.prisma.account.findUnique({
            where: {
                id: userid,
            },
        });
        if (account.isTwofaEnabled) {
            throw new BadRequestException('twofactor authentication is already enabled.');
        }
        const isMatch: boolean = authenticator.verify({
            token: code,
            secret: account.twofaSecret, 
        });
        if (isMatch) {
            await this.prisma.account.update({
                where: {
                    id: account.id, 
                },
                data: {
                    isTwofaEnabled: true,
                }
            });
        } else {
            throw new BadRequestException('operation failed: twofa code incorrect.');
        }
    }

    async disable(userid: string, code: string): Promise<void> {

        const account = await this.prisma.account.findUnique({
            where: {
                id: userid,
            },
        });
        if (!account.isTwofaEnabled) {
            throw new BadRequestException('two factor authentication already disabled');
        }
        return this.verifyAuthenticatorCode(account, code);

    }

    /* *********************  Private Methods ***************** */
    private async secretAndQrCodeGenerator(account: Account & { owner: { name: string } }): Promise<string> {

        const secret: string = authenticator.generateSecret();
        const twofaUri: string = authenticator.keyuri(account.owner.name, 'l3okosat', secret);
        const qrcodeTwofaUri = await toDataURL(twofaUri);
        await this.prisma.account.update({ 
            where: {
                id: account.id, 
            },
            data: {
                twofaSecret: secret,
            },
        });
        return qrcodeTwofaUri;
    }

    private async verifyAuthenticatorCode(account: Account, code: string): Promise<void> {

        const isMatch: boolean = authenticator.verify({
            token: code,
            secret: account.twofaSecret, 
        });
        if (isMatch) {
            await this.prisma.account.update({
                where: { id: account.id },
                data: { isTwofaEnabled: false },
            });
        } else {
            throw new BadRequestException('operation failed: code incorrect.');
        }
    }
}
