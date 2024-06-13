import { Provider } from "@nestjs/common"

import { ProviderName } from "./provider-name"
import { YahooFinanceAdaptor } from "src/domain/adaptor/yahoo-finance-adaptor"
import { ConfigService } from "src/infrastructure/config/config"
import { CoinCapAdaptor } from "src/domain/adaptor/coincap-adaptor"

export const yahooFinanceProvider: Provider = {
    provide: ProviderName.YAHOO_FINANCE_ADAPTOR,
    useFactory: () => {
        return new YahooFinanceAdaptor()
    },
    inject: []
}

export const coinCapProvider: Provider = {
    provide: ProviderName.COIN_CAP_ADAPTOR,
    useFactory: (config: ConfigService) => {
        return new CoinCapAdaptor(config)
    },
    inject: [ ProviderName.ENV_CONFIG ]
}