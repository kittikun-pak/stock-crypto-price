import {
    IsDefined,
    IsNotEmpty,
    IsEmail,
} from 'class-validator'

export class CreateUserRequestValidator {
    @IsDefined()
    @IsNotEmpty()
    @IsEmail()
    public email: string

    @IsDefined()
    @IsNotEmpty()
    public password: string

    public getEmail(): string {
        return this.email
    }

    public getPassword(): string {
        return this.password
    }
}