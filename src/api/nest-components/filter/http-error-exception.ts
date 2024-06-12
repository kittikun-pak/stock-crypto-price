import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common"
import { Response } from "express"

import { ProviderName } from "../providers/provider-name"
import { CustomerError } from "src/domain/commons/errors"

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    constructor() {}

    public catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp()
        const request = ctx.getRequest<any>()
        const response = ctx.getResponse<Response>()
        const status = exception.getStatus()
        let responseObj = {
            domain: 'Stock-Crypto-Price',
            code: `$${status}`,
            message: exception.message
        }

        if(exception instanceof CustomerError) {
            responseObj = exception.getSchema()
        }

        response.status(status).json(responseObj)
    }
}