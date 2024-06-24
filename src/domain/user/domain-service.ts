import { 
    Observable,
    of,
    map,
    tap,
    catchError,
    throwError
} from 'rxjs'

import { User } from './model'
import { UserAuthentication } from './value-objects'
import { IUserRepository } from './repository'
import { BadRequestError, NotFoundError } from '../commons/errors'
import { UserDomainServiceError } from './error'

export type CreateUserInput = {
    email: string
    password: string
}

export class UserDomainService {
    constructor(
        private readonly _userRepo: IUserRepository
    ) {}

    public createUser(input: CreateUserInput): Observable<User> {
        const validCreateUser = (input:CreateUserInput): Observable<boolean> => {
            return this._userRepo.findByEmail(input.email).pipe(
                map(() => false),
                catchError((err) => {
                    if(err instanceof NotFoundError) {
                        return of(true)
                    }

                    return throwError(() => err)
                })
            )
        }

        const createUser = (input: CreateUserInput): User => {
            const salt = UserAuthentication.generateSalt()
            const hashedPassword = UserAuthentication.hashPassword(input.password, salt)
            const authentication = new UserAuthentication(hashedPassword, salt)
            const user = new User(input.email)

            user.setAuthentication(authentication)

            return user
        }

        return validCreateUser(input).pipe(
            tap(valid => {
                if(valid === false) {
                    throw new BadRequestError(UserDomainServiceError.cannotCreateUserCauseUserIsExists())
                }
            }),
            map(() => {
                return createUser(input)
            })
        )
    }
}