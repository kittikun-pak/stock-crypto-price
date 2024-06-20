import { v4 as uuid } from 'uuid'

import { Entity } from '../commons/entity/entity'
import { UserAuthentication } from './value-objects'

export type UserSchema = {
    id: string
    email: string
    authentication: UserAuthentication | null
}

export class User extends Entity {
    private _email: string
    private _authentication: UserAuthentication | null

    public static createFromExisting(obj: UserSchema): User {
       const {
        id,
        email,
        authentication
       } = obj

       const user = new User(email)
       user.id = id
       user._authentication = authentication
       
        return user
    }

    constructor(email: string) {
        super()

        this.id = uuid()
        this._email = email
    }

    public getEmail(): string {
        return this._email
    }

    public getAuthentication(): UserAuthentication | null {
        return this._authentication
    }

    public setAuthentication(authentication: UserAuthentication) {
        this._authentication = authentication
    }
}