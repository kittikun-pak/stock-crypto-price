import { Module } from "@nestjs/common"

import { 
    authServiceProvider,
    cryptoServiceProvider, 
    portServiceProvider, 
    stockServiceProvider, 
    userServiceProvider 
} from "../providers/service"
import { AdaptorModule } from "./adaptor-module"
import { CacheRedisModule } from './redis-module'
import { DomainServiceModule } from "./domain-service-module"
import { RepositoryModule } from './repository-module'
import { JwtModule } from "./jwt-module"

@Module({
    imports: [ 
        CacheRedisModule, 
        AdaptorModule,
        DomainServiceModule,
        RepositoryModule,
        JwtModule
    ],
    providers: [
        stockServiceProvider,
        cryptoServiceProvider,
        userServiceProvider,
        authServiceProvider,
        portServiceProvider
    ],
    exports: [
        stockServiceProvider,
        cryptoServiceProvider,
        userServiceProvider,
        authServiceProvider,
        portServiceProvider
    ]
})
export class ServiceModule {}