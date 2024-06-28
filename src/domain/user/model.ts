import { v4 as uuid } from 'uuid'

import { Entity } from '../commons/entity/entity'
import { UserAuthentication } from './value-objects'

export type UserSchema = {
    id: string
    email: string
    authentication: UserAuthentication | null
    balance: number
}

export class User extends Entity {
    private _email: string
    private _authentication: UserAuthentication | null
    private _balance: number

    public static createFromExisting(obj: UserSchema): User {
       const {
        id,
        email,
        authentication,
        balance,
       } = obj

       const user = new User(email)
       user.id = id
       user._authentication = authentication
       user._balance = balance
       
       
        return user
    }

    constructor(email: string) {
        super()

        this.id = uuid()
        this._email = email
        this._balance = 0
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

    public getBalance(): number {
        return this._balance
    }
    public setBalance(balance: number) {
        this._balance = balance
    }
}