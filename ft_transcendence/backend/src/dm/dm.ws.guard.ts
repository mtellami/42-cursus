import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { WsArgumentsHost } from "@nestjs/common/interfaces";
import { SocketUser } from "datatype/socket-ws.type";
import { WsBadRequestException } from "src/common/exceptions/ws-custom.exception";
import { PrismaService } from "src/common/prisma/prisma.service";
import { stringIsNotUUID } from "src/common/utils/string-utils";

const validateWsMessageBodyDto = (message: any): { chatid: string } => {
    if (!message || typeof message !== 'object') {
      throw new WsBadRequestException(`body must be json`);
    }
    if (stringIsNotUUID(message.chatid)) {
      throw new WsBadRequestException('Missing or invalid `chatid` property must be UUID format.');
    }
    return message;
}

@Injectable()
export class WsDmCanSendGuard implements CanActivate {
    constructor (private prisma: PrismaService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const ws: WsArgumentsHost = context.switchToWs();
        const userid: string = ws.getClient<SocketUser>().user.id;
        const message = validateWsMessageBodyDto(ws.getData());

        const dmInfo = await this.prisma.dm.findFirst({
            where: {
                id: message.chatid,
                OR: [
                    { senderid: userid, },
                    { receiverid: userid, },
                ],
            },
            select: {
                senderid: true,
                receiverid: true,
            }
        });
        if (!dmInfo) {
            throw new WsBadRequestException('can t send message to dm inbox');
        }
        const relationInfo = await this.prisma.friendship.findFirst({
            where: {
                OR: [
                    {
                        senderId: dmInfo.senderid,
                        receiverId: dmInfo.receiverid,
                    },
                    {
                        senderId: dmInfo.receiverid,
                        receiverId: dmInfo.senderid,
                    },
                ],
            },
            select: {
                status: true,
            },
        });
        if (relationInfo && relationInfo.status === 'BLOCKED') {
            throw new WsBadRequestException('can t send message to dm inbox');
        }
        return true;
    }
}

@Injectable()
export class WsDmCanReadGuard implements CanActivate {
    constructor (private prisma: PrismaService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const ws: WsArgumentsHost = context.switchToWs();
        const userid: string = ws.getClient<SocketUser>().user.id;
        const message = validateWsMessageBodyDto(ws.getData());

        const info = await this.prisma.dm.findFirst({
            where: {
                id: message.chatid,
                OR: [
                    { senderid: userid, },
                    { receiverid: userid, }
                ],
            },
            select: {
                id: true,
            },
        });
        if (!info) {
            throw new WsBadRequestException('direct message not found');
        }
        return true;
    }
}
