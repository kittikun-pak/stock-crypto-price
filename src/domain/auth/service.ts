import { 
    Observable, 
    catchError, 
    throwError, 
    tap,
    map,
    from,
    mergeMap,
    forkJoin
} from 'rxjs'
import { SignOptions } from 'jsonwebtoken'
import { isNil } from 'lodash'
import { v4 as uuid } from 'uuid'

import { JwtAuthService } from './jwt-auth-service'
import { IUserRepository, User } from '../user'
import { NotFoundError, UnauthorizedError } from '../commons/errors'
import { AuthorizedServiceError } from './error'


enum TokenPayloadType {
    USER = 'user'
}

type LogRequest = {
    email: string,
    password: string
}

type LoginResponse = {
    tokenType: string
    accessToken: string
    expiresIn: number
    //refreshToken: string
}

type TokenPayload<P> = {
    payload: P
    userId: string
    expiresInSecond: number
}

type TokenResponse = {
    tokenType: string
    token: string
    expiresIn: number
}

type UserToken = {
    userId: string
    type: TokenPayloadType
}

export type UserTokenPayload = UserToken & {
    permissions: string[]
}

export class AuthService {
    private static _ACCESS_TOKEN_EXPIRES_IN_SECOND = 60 * 30 // 30 min

    constructor(
        private readonly _jwtAuthService: JwtAuthService,
        private readonly _userRepository: IUserRepository
    ) {}

    public userLogin(payload: LogRequest): Observable<LoginResponse> {
        const validatePassword = (user: User): void => {
            if(isNil(user.getAuthentication()) || user.getAuthentication().isValidPassword(payload.password) === false) {
                throw new UnauthorizedError(AuthorizedServiceError.InvalidEmailOrPassword())
            }
        }

        const generateToken = (input: TokenPayload<UserToken>): Observable<TokenResponse> => {
            const { payload, expiresInSecond, userId } = input

            const signOptions: SignOptions = {
                jwtid: uuid(),
                expiresIn: expiresInSecond,
                subject: userId
            }

            return from(this._jwtAuthService.sign(payload, signOptions)).pipe(
                catchError(err => {
                    return throwError(() => new UnauthorizedError(AuthorizedServiceError.cannotSigningJwtToken(err.message)))
                }),
                map<string, TokenResponse>((token: string) => {
                    return {
                        tokenType: 'Bearer',
                        token,
                        expiresIn: expiresInSecond
                    }
                })
            )
        }

        return this._userRepository.findByEmail(payload.email).pipe(
            catchError(err => {
                if(err instanceof NotFoundError) {
                    return throwError(() => new UnauthorizedError(AuthorizedServiceError.InvalidEmailOrPassword()))
                }
            }),
            tap(user => {
                validatePassword(user)
            }),
            mergeMap(user => {
                const payload = {
                    userId: user.getId(),
                    type: TokenPayloadType.USER
                }

                return forkJoin({
                    accessToken: generateToken({
                        payload,
                        userId: payload.userId,
                        expiresInSecond: AuthService._ACCESS_TOKEN_EXPIRES_IN_SECOND
                    })
                })
            }),
            map(({ accessToken }) => {
                return {
                    tokenType: accessToken.tokenType,
                    accessToken: accessToken.token,
                    expiresIn: accessToken.expiresIn,
                }
            })
        )
    }

    public verifyToken<P extends UserToken>(token: string): Observable<P> {
        const acceptableTokenPayloadTypes = [ TokenPayloadType.USER ]

        return from(this._jwtAuthService.verify<P>(token).pipe(
            tap(payload => {
                if(acceptableTokenPayloadTypes.includes(payload.type) === false) {
                    throw new UnauthorizedError(AuthorizedServiceError.invalidToken()) 
                }
            }),
            catchError(err => {
                return throwError(() => new UnauthorizedError(AuthorizedServiceError.verifyJwtTokenError(err.message ?? ['N/A'])))
            }),
        ))
    }
}