import { CACHE_MANAGER, Cache } from "@nestjs/cache-manager"
import { Inject } from "@nestjs/common"
import { 
    Observable, 
    map, 
    mergeMap, 
    tap 
} from "rxjs"

import { IYahooFinanceAdaptor } from "../adaptor/yahoo-finance-adaptor"
import { BadRequestError } from "../commons/errors"
import { StockServiceError } from "./error"
import { Stock } from "./model"
import { createStockDto } from "./dto"

type GetStockResponse = {
    companyName: string
    symbol: string
    price: number
    currency: string
}

export class StockService {
    constructor(
        @Inject(CACHE_MANAGER) private readonly _cacheRedis: Cache,
        private readonly _yahooFinanceAdaptor: IYahooFinanceAdaptor
    ) {}

    public getStock(name: string):Observable<GetStockResponse> {
        return this._yahooFinanceAdaptor.getCompanyInfo(name).pipe(
            tap(res => {
                if(res.isSuccess === false) {
                    throw new BadRequestError(StockServiceError.cannotGetCompanyInfo(name))
                }
            }),
            mergeMap(res => {
                return this._yahooFinanceAdaptor.getStockPrice(res.yahooFinanceResponse.symbol)
            }),
            tap(res => {
                if(res.isSuccess === false) {
                    throw new BadRequestError(StockServiceError.cannotGetStockPrice(res.reasons[0]))
                }
            }),
            map(res => {
                const { shortName, symbol, price, currency } = res.yahooFinanceResponse

                const stock = new Stock(shortName, symbol, price, currency)

                return createStockDto(stock)
            })
        )
    }
}