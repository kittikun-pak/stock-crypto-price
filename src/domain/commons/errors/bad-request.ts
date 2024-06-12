import { HttpStatus } from "@nestjs/common"
import { clone } from "lodash"

import { CustomerError } from "./custom-error"
import { Lang, Locale } from "./locale"

export type BadRequestErrorMap = {
    domain: string
    code: string
    message: Locale
    reasons: Locale[]
}

export class BadRequestError extends CustomerError {
    public domain: string
    public code: string
    public message: string
    public localMessage: Locale
    public reasons: Locale[]
    public concatenateMessage: Locale

    constructor(domainError: BadRequestErrorMap) {
        super(`BadRequestError`, HttpStatus.BAD_REQUEST)
        this.code = domainError.code,
        this.domain = domainError.domain,
        this.message = domainError.message.getSchema().en
        this.localMessage = domainError.message
        this.reasons = domainError.reasons
        this.concatenateMessage = domainError.reasons.reduce((message: Locale, reason: Locale) => {
            message.concat(reason)

            return message
        }, clone(domainError.message))
    }

    public getSchema(lang: Lang = Lang.EN) {
        return {
            code: this.code,
            domain: this.domain,
            message: this.message,
            localMessage: this.localMessage.getLang(lang) || this.localMessage.getLang(Lang.EN),
            reasons: this.reasons.map(reason => reason.getLang(lang) || reason.getLang(Lang.EN))
        }
    }
}