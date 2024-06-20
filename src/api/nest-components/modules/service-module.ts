import { Module } from "@nestjs/common"

import { 
    cryptoServiceProvider, 
    stockServiceProvider, 
    userServiceProvider 
} from "../providers/service"
import { AdaptorModule } from "./adaptor-module"
import { CacheRedisModule } from './redis-module'
import { DomainServiceModule } from "./domain-service-module"
import { RepositoryModule } from './repository-module'

@Module({
    imports: [ 
        CacheRedisModule, 
        AdaptorModule,
        DomainServiceModule,
        RepositoryModule
    ],
    providers: [
        stockServiceProvider,
        cryptoServiceProvider,
        userServiceProvider
    ],
    exports: [
        stockServiceProvider,
        cryptoServiceProvider,
        userServiceProvider
    ]
})
export class ServiceModule {}