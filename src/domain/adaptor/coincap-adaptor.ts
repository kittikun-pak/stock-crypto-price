import axios, { AxiosRequestConfig } from "axios"
import { 
    Observable, 
    map, 
    throwError,
    from,
    of,
    catchError
} from "rxjs"
import { isNil } from "lodash"

import { ConfigService } from "src/infrastructure/config/config"

type CoinCapInquireCoinDataResponse = {
    data: {
        id: string
        rank: string
        symbol: string
        name: string
        supply: string
        maxSupply: string
        marketCapUsd: string
        priceUsd: string
    }
}

type BaseResult = {
    isSuccess: boolean
    reasons: string[]
    coinCapResponse: any
}

type CoinCapInquireCoinDataSuccessResult = BaseResult & {
    isSuccess: true
    coinCapResponse: {
        id: string
        symbol: string
        name: string
        priceUsd: string
    }
}

type CoinCapInquireCoinDataFailResult = BaseResult & {
    isSuccess: false
}

export type CoinCapInquireCoinDataResult = CoinCapInquireCoinDataSuccessResult | CoinCapInquireCoinDataFailResult

export interface ICoinCapAdaptor {
    getCrypto(coinName: string): Observable<CoinCapInquireCoinDataResult>
}

export class CoinCapAdaptor implements ICoinCapAdaptor {
    private _baseUrl: string

    constructor(private readonly _config: ConfigService) {
        this._baseUrl = this._config.coinCap().baseUrl
    }

    public getCrypto(coinName: string): Observable<CoinCapInquireCoinDataResult> {
        const url = `${this._baseUrl}/${coinName}`

        return from(axios.get<CoinCapInquireCoinDataResponse>(url)).pipe(
            map(res => {
                const { data } = res.data

                if(isNil(data)) {
                    return {
                        isSuccess: false,
                        reasons: [`can not get coin data`],
                        coinCapResponse: res
                    }
                }

                return {
                    isSuccess: true,
                    reasons: [],
                    coinCapResponse: {
                        id: data.id,
                        symbol: data.symbol,
                        name: data.name,
                        priceUsd: data.priceUsd
                    }
                }
            }),
            catchError(err => {
                if (axios.isAxiosError(err) && err.response.status != 200) {
                    return of({
                        isSuccess: false,
                        reasons: [`can not get coin data`],
                        coinCapResponse: err
                    })
                }

                return throwError(() => err)  
            })
        )
    }
}