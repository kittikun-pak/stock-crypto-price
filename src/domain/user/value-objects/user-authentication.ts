import { randomBytes, createHash } from 'crypto'

import { ComparableFieldSelector, ValueObject } from 'src/domain/commons/entity/value-object'

export class UserAuthentication extends ValueObject {
    private _password: string
    private _salt: string

    constructor(password: string, salt: string){
        super()
        this._password = password
        this._salt = salt
    }

    public static generateSalt(): string {
        return randomBytes(16).toString('base64')
    }

    public static hashPassword(password: string, salt: string): string {
        return createHash('sha512').update(password + salt).digest('hex')
    }

    public getPassword(): string {
        return this._password
    }

    public setPassword(password: string, salt: string) {
        return new UserAuthentication(password, salt)
     }

    public getSalt(): string {
        return this._salt
    }

    public setSalt(salt: string) {
        return new UserAuthentication(this._password, salt)
    }

    public isValidPassword(password: string): boolean {
        return UserAuthentication.hashPassword(password, this._salt) === this._password
    }

    public isEqual(valueObjectToCompareWith: this): boolean {
        const comparableFields: ComparableFieldSelector[] = [
            {
                selectFieldToCompare: (valueObject: this) => valueObject.getPassword()
            },
            {
                selectFieldToCompare: (valueObject: this) => valueObject.getSalt()
            }
        ]

        return this.isEqualByComparableFields(valueObjectToCompareWith, comparableFields)
    }
}