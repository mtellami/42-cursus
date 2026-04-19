import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
import { Response } from "express";

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: Error, host: ArgumentsHost) {
        const response: Response = host.switchToHttp().getResponse<Response>();

        if (exception instanceof HttpException) {
            response.status(exception.getStatus()).json(exception.getResponse());
        } else {
            const status = exception['statusCode'] || 400;
            


            /** enable swagger on development mode only */
            if (process.env.NODE_ENV === 'development') {
                console.log(exception);
            }

            response.status(status).json({
                statusCode: status,
                message: 'Something Wrong, Please repport this issue or try later.',
                error: 'Something Wrong',
            });
        }
    };
}
