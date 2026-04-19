import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { WsArgumentsHost } from "@nestjs/common/interfaces";
import { SocketUser } from "datatype/socket-ws.type";
import { WsBadRequestException } from "src/common/exceptions/ws-custom.exception";
import { PrismaService } from "src/common/prisma/prisma.service";
import { isThisDateInFuture } from "src/common/utils/date-time";
import { stringIsNotUUID } from "src/common/utils/string-utils";

const validateWsChatMessageDto = (message: any): { chatid: string } =>{
    if (!message || typeof message !== 'object') {
      throw new WsBadRequestException('body must be json');
    }
    if (stringIsNotUUID(message.chatid)) {
      throw new WsBadRequestException('Missing or invalid `chatid` property must be UUID format.');
    }
    return message;
}

@Injectable()
export class WsChatRoomCanSendGuard implements CanActivate {
    constructor (private prisma: PrismaService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const ws: WsArgumentsHost = context.switchToWs();
        const userid: string = ws.getClient<SocketUser>().user.id;
        const message = validateWsChatMessageDto(ws.getData());

        const info = await this.prisma.chatMember.findFirst({
            where: {
                userid: userid,
                chatid: message.chatid,
            },
            select: {
                status: true,
                mutedUntil: true,
            },
        });
        if (!info || info.status === 'BANED') {
            throw new WsBadRequestException('chat room trying to send message into was not found');
        }
        if (info.status === 'MUTED' && isThisDateInFuture(info.mutedUntil)) {
            throw new WsBadRequestException('enable to send message: you are muted');
        }
        return true;
    }
}

@Injectable()
export class WsChatRoomCanReadGuard implements CanActivate {
    constructor (private prisma: PrismaService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const ws: WsArgumentsHost = context.switchToWs();
        const userid: string = ws.getClient<SocketUser>().user.id;
        const message = validateWsChatMessageDto(ws.getData());

        const info = await this.prisma.chatMember.findFirst({
            where: {
                userid: userid,
                chatid: message.chatid,
            },
            select: {
                status: true,
            },
        });
        if (!info || info.status === 'BANED') {
            throw new WsBadRequestException('chat room trying to send message into was not found');
        }
        return true;
    }
}
