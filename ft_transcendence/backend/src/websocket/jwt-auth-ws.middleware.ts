import { JwtService } from "@nestjs/jwt";
import { JwtUser } from "datatype/jwt.user.dto";
import { Socket } from 'socket.io';


export const WSJwtAuthMiddleware = (jwt: JwtService) => (socket: Socket, next: Function): void => {
    try {
        // const token = socket.handshake.auth.token || socket.handshake.headers['token'];
        const token = socket.handshake.headers.cookie.replace('Bearer=', '');
        const { id, twofa }: JwtUser = jwt.verify(token);

        if (twofa) {
            next(new Error('Waiting for verify two factor authentication'));
        }

        socket['user'] = { id };
        socket['game'] = { paddel: 300 };
        next();
    }
    catch (error) {
        next(error);
    }
}
