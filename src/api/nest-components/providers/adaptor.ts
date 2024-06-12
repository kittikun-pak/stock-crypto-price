import { Provider } from "@nestjs/common"

import { ProviderName } from "./provider-name"
import { YahooFinanceAdaptor } from "src/domain/adaptor/yahoo-finance-adaptor"

export const yahooFinanceProvider: Provider = {
    provide: ProviderName.YAHOO_FINANCE_ADAPTOR,
    useFactory: () => {
        return new YahooFinanceAdaptor()
    },
    inject: []
}