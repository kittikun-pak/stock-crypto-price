import { Provider } from "@nestjs/common"
import { Cache } from "cache-manager"
import { CACHE_MANAGER } from "@nestjs/cache-manager"

import { ProviderName } from "./provider-name"
import { YahooFinanceAdaptor } from "src/domain/adaptor/yahoo-finance-adaptor"
import { StockService } from "src/domain/stock/service"
import { CoinCapAdaptor } from "src/domain/adaptor/coincap-adaptor"
import { CryptoService } from "src/domain/crypto/service"
import { UserRepository, UserService } from "src/domain/user"
import { UserDomainService } from "src/domain/user/domain-service"



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

export const cryptoServiceProvider: Provider = {
    provide: ProviderName.CRYPTO_SERVICE,
    useFactory: (
        cacheRedis: Cache,
        coinCapAdaptor: CoinCapAdaptor
    ) => {
        return new CryptoService(cacheRedis, coinCapAdaptor)
    },
    inject: [ CACHE_MANAGER, ProviderName.COIN_CAP_ADAPTOR ]
}

export const userServiceProvider: Provider = {
    provide: ProviderName.USER_SERVICE,
    useFactory: (
        cacheRedis: Cache,
        userRepository: UserRepository,
        userDomainService: UserDomainService,
    ) => {
        return new UserService(cacheRedis, userRepository, userDomainService)
    },
    inject: [ CACHE_MANAGER, ProviderName.USER_REPOSITORY , ProviderName.USER_DOMAIN_SERVICE ]
}