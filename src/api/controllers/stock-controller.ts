import { 
    Controller,
    Inject,
    Get,
    Query
} from "@nestjs/common"

import { ProviderName } from "../nest-components/providers/provider-name"
import { StockService } from "src/domain/stock/service"
import { ValidationPipe } from "../nest-components/pipes/validation-pipe"
import { GetStockRequestValidator } from "../request-validator/stock/get-stock"

@Controller('/stock')
export class StockController {
    constructor(
        @Inject(ProviderName.STOCK_SERVICE) private readonly _stockService: StockService
    ) {}

    @Get('/')
    public getCompanyInfo(
        @Query(new ValidationPipe()) query: GetStockRequestValidator
    ) {
        const name = query.getByCompanyName()

        return this._stockService.getStock(name)
    }
}