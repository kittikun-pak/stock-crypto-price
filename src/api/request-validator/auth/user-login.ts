import { 
    IsDefined,
    IsNotEmpty,
    IsString,
    IsEmail,
    MaxLength
} from 'class-validator'

export class UserLoginRequestValidator {
    @IsDefined()
    @IsNotEmpty()
    @IsEmail()
    @IsString()
    public email: string

    @IsDefined()
    @IsNotEmpty()
    @IsString()
    @MaxLength(255)
    public password: string

    public getPayload() {
        return {
            email: this.email,
            password: this.password
        }
    }
}