import yahooFinance, {  } from 'yahoo-finance2'
import { 
    Observable,
    from,
    map,
    tap,
    catchError,
    throwError
} from 'rxjs'
import {
    head,
    isEmpty,
    isNil
} from 'lodash'

type YahooFinanceQuote = {
    exchange: string | ''
    shortname: string | ''
    quoteType: string | ''
    symbol: string | ''
    index: string | ''
    score: number | null
}

type BaseResult = {
    isSuccess: boolean
    reasons: string[]
    yahooFinanceResponse: any
}

type YahooFinanceInquireCompanyInfoSuccessResult = BaseResult & {
    isSuccess: true
    yahooFinanceResponse: {
        count: number
        symbol: string
        quotes: YahooFinanceQuote[]
    }
}

type YahooFinanceInquireCompanyInfoFailResult = BaseResult & {
    isSuccess: false
}

export type YahooFinanceInquireCompanyInfoResult = YahooFinanceInquireCompanyInfoSuccessResult | YahooFinanceInquireCompanyInfoFailResult

type YahooFinanceInquirePriceSuccessResult = BaseResult & {
    isSuccess: true
    yahooFinanceResponse: {
        shortName: string
        symbol: string
        price: number
        currency: string
    }
}

type YahooFinanceInquirePriceFailResult = BaseResult & {
    isSuccess: false
}

export type YahooFinanceInquireResult = YahooFinanceInquirePriceSuccessResult | YahooFinanceInquirePriceFailResult


export interface IYahooFinanceAdaptor {
    getCompanyInfo(name: string): Observable<YahooFinanceInquireCompanyInfoResult>
    getStockPrice(symbol: string): Observable<YahooFinanceInquireResult>
}

export class YahooFinanceAdaptor implements IYahooFinanceAdaptor {
    public getCompanyInfo(name: string): Observable<YahooFinanceInquireCompanyInfoResult> {
        return from(yahooFinance.search(name)).pipe(
            map(res => {
                const isCompanyExists = res.count > 0 && isEmpty(res.quotes) === false && res.shortname !== ''

                if(isCompanyExists === false) {
                    return {
                        isSuccess: false,
                        reasons: [`quotes not found`],
                        yahooFinanceResponse: res
                    }
                }

                return {
                    isSuccess: true,
                    reasons: [],
                    yahooFinanceResponse: {
                        count: res.count,
                        symbol: head(res.quotes).symbol,
                        quotes: res.quotes.map(quotes => {
                            return {
                                exchange: quotes.exchange ?? '',
                                shortname: quotes.shortname ?? '',
                                quoteType: quotes.quoteType ?? '',
                                symbol: quotes.symbol ?? '',
                                index: quotes.index ?? '',
                                score: quotes.score ?? null,
                            }
                        })
                    }
                }
            }),
            catchError(err =>throwError(() => err))
        )
    }

    public getStockPrice(symbol: string):Observable<YahooFinanceInquireResult> {
        return from(yahooFinance.quote(symbol)).pipe(
            map(res => {
                const isSuccess = isNil(res.regularMarketPrice) === false && isNil(res.currency) === false
                if(isSuccess === false) {
                    return {
                        isSuccess,
                        reasons: [`data not found`],
                        yahooFinanceResponse: res
                    }
                }

                return {
                    isSuccess,
                    reasons: [],
                    yahooFinanceResponse: {
                        shortName: res.shortName,
                        symbol: res.symbol,
                        price: res.regularMarketPrice,
                        currency: res.currency
                    }
                }
            }),
            catchError(err => throwError(() => err))
        )
    }
}