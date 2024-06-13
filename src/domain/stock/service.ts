import { CACHE_MANAGER, Cache } from "@nestjs/cache-manager"
import { Inject } from "@nestjs/common"
import { 
    Observable, 
    delayWhen, 
    map, 
    mergeMap, 
    tap,
    switchMap,
    from,
    of
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

    public getStockBySymbol(symbol: string): Observable<GetStockResponse> {
        const key = this._generateRedisKey(symbol)

        return from(this._cacheRedis.get<string>(key)).pipe(
            switchMap(data => {
                if(data) {
                    return of(JSON.parse(data))
                } 
                else {
                    return this._yahooFinanceAdaptor.getStockPrice(symbol).pipe(
                        tap(res => {
                            if(res.isSuccess === false) {
                                throw new BadRequestError(StockServiceError.cannotGetStockPrice(res.reasons[0]))
                            }
                        }),
                        map(res => {
                            const { shortName, symbol, price, currency } = res.yahooFinanceResponse
                            const stock = new Stock(shortName, symbol, price, currency)
            
                            return createStockDto(stock)
                        }),
                        delayWhen(stock => {
                            const data = JSON.stringify(stock)
                            const ttl = 60 * 1000 // 60 sec
            
                            return this._cacheRedis.set(key, data, ttl)
                        })
                    )
                }
            })
        )
    }

    public getStockByName(name: string):Observable<GetStockResponse> {
        const key = this._generateRedisKey(name)

        return from(this._cacheRedis.get<string>(key)).pipe(
            switchMap(data => {
                if(data) {
                    return of(JSON.parse(data))
                } 
                else {
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
                        }),
                        delayWhen(stock => {
                            const data = JSON.stringify(stock)
                            const ttl = 60 * 1000 // 60 sec
            
                            return this._cacheRedis.set(key, data, ttl)
                        })
                    )
                }
            })
        )
    }

    private _generateRedisKey(key: string): string {
        return `${process.env.NODE_ENV}:${key}`
    }
}