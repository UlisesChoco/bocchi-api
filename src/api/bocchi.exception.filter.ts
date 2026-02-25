import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
import { AxiosError } from "axios";
import { Request, Response } from "express";

@Catch(HttpException, AxiosError)
export class BocchiExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException | AxiosError, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response: Response = ctx.getResponse();
        let json = {
            statusCode: 500,
            error: 'Internal Server Error',
            myCustomProperty: "this response was handled by my custom exception filter !"
        };

        if(exception instanceof HttpException)
            json = this.handleHttpException(exception, response);

        if(exception instanceof AxiosError)
            json = this.handleAxiosException(exception, response);

        response
        .status(json.statusCode)
        .json(json);
    }

    private handleHttpException(exception: HttpException, response: Response) {
        const statusCode = exception.getStatus();
        const error = exception.message;

        return {
            statusCode: statusCode,
            error: error,
            myCustomProperty: "this response was handled by my custom exception filter !"
        }
    }

    private handleAxiosException(exception: AxiosError, response: Response) {
        const statusCode = exception.response?.status || 500;
        const error = exception.message;

        return {
            statusCode: statusCode,
            error: error,
            myCustomProperty: "this response was handled by my custom exception filter !"
        }
    }
}
