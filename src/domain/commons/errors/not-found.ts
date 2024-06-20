import { HttpStatus } from '@nestjs/common'

import { CustomError } from './custom-error'
import { Locale, Lang } from './locale'

export type NotFoundErrorMap = {
    domain: string
    code: string
    message: Locale
    resourceId: string
}

export class NotFoundError extends CustomError {
    public domain: string
    public code: string
    public message: string
    public localMessage: Locale
    public resourceId: string 

    constructor(domainError: NotFoundErrorMap) {
        super(`NotFoundError`, HttpStatus.NOT_FOUND)
        this.code = domainError.code
        this.domain = domainError.domain
        this.message = domainError.message.getSchema().en
        this.localMessage = domainError.message
        this.resourceId = domainError.resourceId
    }

    public getSchema(lang: Lang = Lang.EN) {
        return {
            domain: this.domain,
            code: this.code,
            message: this.message,
            localMessage: this.localMessage.getLang(lang) || this.localMessage.getLang(Lang.EN),
            resourceId: this.resourceId
        }
    }
}