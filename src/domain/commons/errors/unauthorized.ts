import { HttpStatus } from '@nestjs/common'

import { CustomError } from './custom-error'
import { Lang, Locale } from './locale'

export type UnauthorizedErrorMap = {
    domain: string
    code: string
    message: Locale
}

export class UnauthorizedError extends CustomError {
    public domain: string
    public code: string
    public localMessage: Locale

    constructor(unauthorizedError: UnauthorizedErrorMap) {
        super('UnauthorizedError', HttpStatus.UNAUTHORIZED)
        this.domain = unauthorizedError.domain,
        this.code = unauthorizedError.code,
        this.message = unauthorizedError.message.getSchema().en,
        this.localMessage = unauthorizedError.message
    }

    public getSchema(lang: Lang = Lang.EN) {
        return {
            domain: this.domain,
            code: this.code,
            message: this.message,
            localMessage: this.localMessage.getLang(lang) || this.localMessage.getLang(Lang.EN)
        }
    }
}