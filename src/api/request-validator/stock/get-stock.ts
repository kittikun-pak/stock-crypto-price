import { 
    ValidateIf, 
    IsDefined,
    IsString, 
} from "class-validator"
import { isNil } from "lodash"

export class GetStockRequestValidator {
    @ValidateIf(o => isNil(o.bySymbol))
    @IsDefined()
    @IsString()
    public byCompanyName: string

    @ValidateIf(o => isNil(o.byCompanyName))
    @IsDefined()
    @IsString()
    public bySymbol: string

    public getByCompanyName(): string {
        return this.byCompanyName ?? this.bySymbol
    }
}


