import { 
    CanActivate, 
    Injectable, 
    Inject,
    ExecutionContext
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Observable, throwError, map } from 'rxjs'
import { isNil, last } from 'lodash'

import { ProviderName } from '../providers/provider-name'
import { AuthService } from 'src/domain/auth/service'
import { UnauthorizedError } from 'src/domain/commons/errors'
import { AuthorizedServiceError } from 'src/domain/auth/error'


@Injectable()
export class PermissionGuard implements CanActivate {
    constructor(
        @Inject(ProviderName.AUTH_SERVICE) private readonly _authService: AuthService,
    ) {}

    public canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest()
        const { headers } = request
        const { authorization } = headers || {}

        if(isNil(authorization)) {
            return throwError(() => new UnauthorizedError(AuthorizedServiceError.headerRequired()))
        }

        const token: string = last(authorization.split(' '))

        return this._authService.verifyToken(token).pipe(map(() => true))
    }
}