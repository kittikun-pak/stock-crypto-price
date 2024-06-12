import { Provider } from "@nestjs/common"
import { Cache } from "cache-manager"
import { CACHE_MANAGER } from "@nestjs/cache-manager"

import { ProviderName } from "./provider-name"
import { YahooFinanceAdaptor } from "src/domain/adaptor/yahoo-finance-adaptor"
import { StockService } from "src/domain/stock/service"



export const stockServiceProvider: Provider = {
    provide: ProviderName.STOCK_SERVICE,
    useFactory: (
        cacheRedis: Cache,
        yahooFinanceAdaptor: YahooFinanceAdaptor
    ) => {
        return new StockService(cacheRedis, yahooFinanceAdaptor)
    },
    inject: [ CACHE_MANAGER, ProviderName.YAHOO_FINANCE_ADAPTOR  ]
}