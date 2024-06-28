import { ExecutionContext, createParamDecorator } from '@nestjs/common'
import { isNil } from 'lodash'

import { TokenAttachmentData } from '../interceptors/attach-data'
import { BadRequestError } from 'src/domain/commons/errors'
import { TokenAttachmentDecoratorError } from './error'

export const TokenAttachment = createParamDecorator(
    (data:any, ctx: ExecutionContext): TokenAttachmentData => {
        const request = ctx.switchToHttp().getRequest()
        const hasAttachmentData = isNil(request.attachmentData) === false
        if(hasAttachmentData === false) {
            throw new BadRequestError(TokenAttachmentDecoratorError.missingTokenInRequestHeader())
        }

        return request?.attachmentData ?? null
    }
)