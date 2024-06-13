import { CACHE_MANAGER, Cache } from "@nestjs/cache-manager"
import { Inject } from "@nestjs/common"
import axios, { AxiosRequestConfig } from "axios"
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

import { ICoinCapAdaptor } from "../adaptor/coincap-adaptor"
import { BadRequestError } from "../commons/errors"
import { CryptoServiceError } from "./error"
import { Crypto } from "./model"
import { createCryptoDto } from "./dto"

type GetCryptoResponse = {
    coinName: string
    symbol: string
    price: number
    currency: string
}

export  class CryptoService {
    constructor(
        @Inject(CACHE_MANAGER) private readonly _cacheRedis: Cache,
        private readonly _coinCapAdaptor: ICoinCapAdaptor
    ) {}

    public getCrypto(coinName: string): Observable<GetCryptoResponse> {
        const key = this._generateRedisKey(coinName)

        return from(this._cacheRedis.get<string>(key)).pipe(
            switchMap(data => {
                if(data) {
                    return of(JSON.parse(data))
                }
                else {
                    return this._coinCapAdaptor.getCrypto(coinName).pipe(
                        tap(res => {
                            if(res.isSuccess === false) {
                                throw new BadRequestError(CryptoServiceError.cannotGetCoinPrice(res.reasons[0]))
                            }
                        }),
                        map(res => {
                            const { id, symbol, name, priceUsd  } = res.coinCapResponse
                            const price = parseFloat(priceUsd)
                            const crypto = new Crypto(name, symbol, price, 'usd')
            
                            return createCryptoDto(crypto)
                        }),
                        delayWhen(crypto => {
                            const key = this._generateRedisKey(coinName)
                            const data = JSON.stringify(crypto)
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