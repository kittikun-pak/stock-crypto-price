import { ExceptionFilter, Catch, ArgumentsHost, } from "@nestjs/common";
import { Response } from "express";

@Catch(Error)
export class ErrorExceptionFilter implements ExceptionFilter {
    constructor() {}

    public catch(exception: Error, host: ArgumentsHost) {
        const ctx = host.switchToHttp()
        const response = ctx.getResponse<Response>()

        response.status(500).json({
            domain: 'Stock-Crypto-Price',
            message: exception.message,
            code: 'InternalError'
        })
    }
}