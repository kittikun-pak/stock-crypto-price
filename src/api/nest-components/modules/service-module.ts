import { Module } from "@nestjs/common"

import { AdaptorModule } from "./adaptor-module"
import { CacheRedisModule } from './redis-module'
import { cryptoServiceProvider, stockServiceProvider } from "../providers/service"

@Module({
    imports: [ 
        CacheRedisModule, 
        AdaptorModule 
    ],
    providers: [
        stockServiceProvider,
        cryptoServiceProvider
    ],
    exports: [
        stockServiceProvider,
        cryptoServiceProvider
    ]
})
export class ServiceModule {}