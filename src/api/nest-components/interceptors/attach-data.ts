import { Inject, NestInterceptor, ExecutionContext, CallHandler, Injectable } from '@nestjs/common'
import { Observable, from, of, map, catchError, mergeMap } from 'rxjs'
import { Request } from 'express'

import { ProviderName } from '../providers/provider-name'
import { AuthService, TokenPayloadType, UserToken } from 'src/domain/auth/service'
import { isNil, last } from 'lodash'

type UserAttachmentData = {
    userId: string
    userFirstName?: string
}

export type TokenAttachmentData = {
    isTokenExists: boolean
    tokenPayloadType?: TokenPayloadType
    user?: UserAttachmentData
}

@Injectable()
export class AttachDataInterCeptor implements NestInterceptor<any, any> {
    public static SCP_CONTEXT_HEADER = 'x-scp-context'
    public static ATTACHMENT_DATA_PROPERTY = 'attachmentData'

    constructor(
        @Inject(ProviderName.AUTH_SERVICE)
        private readonly _authService: AuthService,
    ) {}

    public intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        const request = context.switchToHttp().getRequest<Request>()
        const { headers } = request
        const authorization = headers[`authorization`] ?? null

        const prepareAuthTokenPayload = (request: Request, authorization: string) => {
            const defaultAttachmentData: TokenAttachmentData = {
                isTokenExists: false
            }

            if (isNil(authorization)) {
                request[AttachDataInterCeptor.ATTACHMENT_DATA_PROPERTY] = defaultAttachmentData

                return of(false)
            }

            const token: string = last(authorization.split(' '))

            return this._authService.verifyToken(token).pipe(
                map((tokenPayload: UserToken) => {
                    if(isNil(tokenPayload)) {
                        request[AttachDataInterCeptor.ATTACHMENT_DATA_PROPERTY] = defaultAttachmentData

                        return of(false)
                    }

                    const { userId, type } = tokenPayload
                    const attachmentData: TokenAttachmentData = {
                        isTokenExists: true,
                        tokenPayloadType: type,
                        user: {
                            userId: userId
                        }
                    }

                    request[AttachDataInterCeptor.ATTACHMENT_DATA_PROPERTY] = attachmentData

                    return true
                }),
                catchError(err => {
                    console.log(`[AttachDataInterceptor._prepareAuthPayload]: something went wrong when verify token, error: ${err}`)
                    request[AttachDataInterCeptor.ATTACHMENT_DATA_PROPERTY] = defaultAttachmentData

                    return of(false)
                })
            )
        }
        
        return from(prepareAuthTokenPayload(request, authorization)).pipe(
            mergeMap(() => next.handle())
        )
    }


}