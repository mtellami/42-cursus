import { BadRequestException, CanActivate, 
         ExecutionContext, Injectable, 
    } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ChatMemberRole } from "@prisma/client";
import { CHAT_ROLES_KEY } from "src/common/decorators/chat-roles.decorator";
import { Request } from "express";
import { PrismaService } from "src/common/prisma/prisma.service";
import { stringIsNotUUID } from "src/common/utils/string-utils";

@Injectable()
export class ChatRoleGuard implements CanActivate {
    constructor(private reflector: Reflector, private prisma: PrismaService) {}
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req: Request = context.switchToHttp().getRequest();
        const userid: string = req['user']['id'];
        const chatid = req.query['chatid'];
        const roles = this.reflector.getAllAndOverride<ChatMemberRole[]>(
            CHAT_ROLES_KEY,
            [
                context.getHandler(),
                context.getClass(),
            ],
        );
        /** roles is empty: default MEMBER */
        if (roles.length === 0) {
            return true;
        }

        if (typeof chatid !== 'string' || stringIsNotUUID(chatid)) {
            throw new BadRequestException('invalid chatid format, must be uuid');
        }

        const chat = await this.prisma.chat.findUnique({
            where: {
                id: chatid,
            },
            select: {
                members: {
                    where: {
                        userid: userid,
                    },
                    select: {
                        role: true,
                    }
                }
            }
        });

        if (!chat || chat.members.length === 0) {
            throw new BadRequestException('chat permission denied');
        }
        if (roles.includes(chat.members.at(0).role)) {
            return true;
        }
        throw new BadRequestException('chat permission denied');
    }
}
