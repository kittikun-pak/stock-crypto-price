import { 
    Observable,
    of,
    map
} from 'rxjs'

import { User } from './model'
import { UserAuthentication } from './value-objects'

export type CreateUserInput = {
    email: string
    password: string
}

export class UserDomainService {
    public createUser(input: CreateUserInput): Observable<User> {
        const createUser = (input: CreateUserInput): User => {
            const salt = UserAuthentication.generateSalt()
            const hashedPassword = UserAuthentication.hashPassword(input.password, salt)
            const authentication = new UserAuthentication(hashedPassword, salt)
            const user = new User(input.email)

            user.setAuthentication(authentication)

            return user
        }

        return of(input).pipe(
            map(input => createUser(input))
        )
    }
}