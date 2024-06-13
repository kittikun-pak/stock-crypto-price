import { 
    ValidateIf, 
    IsDefined,
    IsOptional,
    IsString,
    IsNotEmpty 
} from "class-validator"

export class GetCryptoRequestValidator {
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    public byCoinName: string

    public getByCoinName() {
        return this.byCoinName
    }
}


