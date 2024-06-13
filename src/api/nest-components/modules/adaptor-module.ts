import { Module } from "@nestjs/common"

import { coinCapProvider, yahooFinanceProvider } from "../providers/adaptor"
import { ConfigModule } from "./config-module"


@Module({
    imports: [ ConfigModule ],
    providers: [
        yahooFinanceProvider,
        coinCapProvider
    ],
    exports: [
        yahooFinanceProvider,
        coinCapProvider
    ]
})
export class AdaptorModule {}