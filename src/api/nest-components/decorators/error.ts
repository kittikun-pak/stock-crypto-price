import { BadRequestErrorMap, Locale } from 'src/domain/commons/errors'

enum Domain {
    System = 'System'
}

export class TokenAttachmentDecoratorError {
    public static prefix = 'TokenAttachmentDecorator'

    public static missingTokenInRequestHeader(): BadRequestErrorMap {
        return {
            domain: Domain.System,
            code: this.prefix + '001',
            message: Locale.en(`cannot process this request cause missing token in request header`)
                .th(`ระบบไม่สามารถทำงานต่อได้ เนื่องจากไม่พบ token ใน request header`)
                .build(),
            reasons: []
        }
    }
}