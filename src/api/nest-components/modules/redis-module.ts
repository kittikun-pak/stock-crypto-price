import { Module } from '@nestjs/common'
import { CacheModule, CacheModuleAsyncOptions } from '@nestjs/cache-manager'
import { redisStore } from 'cache-manager-redis-yet'
import { 
    ConfigModule as NestConfigModule,
    ConfigService as NestConfigService
} from '@nestjs/config'

const environment: string = process.env.NODE_ENV ?? 'local'

const redisOption: CacheModuleAsyncOptions = {
    isGlobal: true,
    imports: [ NestConfigModule.forRoot({
        envFilePath: `./config/${environment}.env`
    }) ],
    useFactory: async(config: NestConfigService) => {
        const store = await redisStore({
            socket: {
                host: config.get<string>('REDIS_URL'),
                port: parseInt(config.get<string>('REDIS_PORT'))
            },
            password: config.get<string>('REDIS_PASSWORD')
        })
        return {
            store: () => store
        }
    },
    inject: [ NestConfigService ]
}

@Module({
imports: [
    CacheModule.registerAsync(redisOption)
]
})
export class CacheRedisModule{}
