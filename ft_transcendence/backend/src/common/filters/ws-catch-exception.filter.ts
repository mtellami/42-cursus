import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
import { WsException } from "@nestjs/websockets";
import { Socket } from "socket.io";
import { WS_EVENT_EXCEPTION } from "../constants/constants";

@Catch()
export class WsExceptionFilter implements ExceptionFilter {
    catch(exception: Error, host: ArgumentsHost) {
        const client: Socket = host.switchToWs().getClient();
        let error: string | object;

        if (exception instanceof HttpException) {
            error = exception.getResponse();
        } else if (exception instanceof WsException) {
            error = exception.getError();
        } else {
            error = {
                error: 'Ooops, Something Wrong.',
                message: 'Ooops, Something Wrong.'
            };


            /** enable swagger on development mode only */
            if (process.env.NODE_ENV === 'development') {
                console.log(exception);
            }
        }
        client.emit(WS_EVENT_EXCEPTION, error);
    };
}
