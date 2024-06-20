import { Observable } from 'rxjs'

import { User } from './model'

export interface UserRepository {
    create(user: User): Observable<string>
}