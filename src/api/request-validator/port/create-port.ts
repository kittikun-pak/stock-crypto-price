import {
    IsDefined,
    IsNotEmpty,
    IsString
} from 'class-validator'

export class CreatePortRequestValidator {
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    public name: string

    public getName(): string {
        return this.name
    }
}