import { 
    ValidateIf, 
    IsDefined,
    IsOptional,
    IsString,
    IsNotEmpty 
} from "class-validator"

export class GetStockRequestValidator {
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    public byCompanyName: string

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    public bySymbol: string

    @ValidateIf(o => (!o.byCompanyName && !o.bySymbol) || (o.byCompanyName && o.bySymbol))
    @IsDefined({message: 'Provide either byCompanyName or bySymbol, and only one of them'})
    protected readonly combinedCheck: undefined;

    public getSchema() {
        return {
            name: this.byCompanyName ?? null,
            symbol: this.bySymbol ?? null
        }
    }
    
}


