import { Observable } from 'rxjs'

import { User } from './model'

export interface IUserRepository {
    create(user: User): Observable<string>
    findByEmail(email: string): Observable<User>
    findById(id: string): Observable<User>
}