import { Module } from '@nestjs/common'
import { CacheModule, CacheModuleAsyncOptions } from '@nestjs/cache-manager'
import { redisStore } from 'cache-manager-redis-yet'

import { ConfigModule } from './config-module'
import { ConfigService } from 'src/infrastructure/config/config'
import { ProviderName } from '../providers/provider-name'


const redisOption: CacheModuleAsyncOptions = {
    isGlobal: true,
    imports: [ ConfigModule ],
    useFactory: async(config: ConfigService) => {
        const store = await redisStore({
            socket: {
                host: config.redisConfig().url,
                port: config.redisConfig().port
            },
        })
        return {
            store: () => store
        }
    },
    inject: [ ProviderName.ENV_CONFIG ]
}

@Module({
imports: [
    CacheModule.registerAsync(redisOption)
]
})
export class CacheRedisModule{}
