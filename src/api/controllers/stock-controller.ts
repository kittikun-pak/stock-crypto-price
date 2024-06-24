import { 
    Controller,
    Inject,
    Get,
    Query,
    UseGuards
} from "@nestjs/common"
import { isNil } from 'lodash'

import { ProviderName } from "../nest-components/providers/provider-name"
import { StockService } from "src/domain/stock/service"
import { ValidationPipe } from "../nest-components/pipes/validation-pipe"
import { GetStockRequestValidator } from "../request-validator/stock/get-stock"
import { PermissionGuard } from "../nest-components/guards/permission"

@Controller('/stock')
export class StockController {
    constructor(
        @Inject(ProviderName.STOCK_SERVICE) private readonly _stockService: StockService
    ) {}

    @Get('/')
    public getStock(
        @Query(new ValidationPipe()) query: GetStockRequestValidator,
    ) {
        const { name, symbol } = query.getSchema()
        
        if(isNil(symbol) === false) {
            return this._stockService.getStockBySymbol(symbol)
        }

        return this._stockService.getStockByName(name)
    }
}