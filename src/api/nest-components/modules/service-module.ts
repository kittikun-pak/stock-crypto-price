import { Module } from "@nestjs/common"

import { AdaptorModule } from "./adaptor-module"
import { CacheRedisModule } from './redis-module'
import { stockServiceProvider } from "../providers/service"

@Module({
    imports: [ 
        CacheRedisModule, 
        AdaptorModule 
    ],
    providers: [
        stockServiceProvider
    ],
    exports: [
        stockServiceProvider
    ]
})
export class ServiceModule {}