import { Module } from "@nestjs/common"

import { yahooFinanceProvider } from "../providers/adaptor"


@Module({
    imports: [],
    providers: [
        yahooFinanceProvider
    ],
    exports: [
        yahooFinanceProvider
    ]
})
export class AdaptorModule {}