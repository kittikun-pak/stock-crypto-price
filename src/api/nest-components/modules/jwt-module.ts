import { Module } from '@nestjs/common'
import { JwtModuleAsyncOptions, JwtModule as NestJwtModule} from '@nestjs/jwt'

import { jwtProvider } from '../providers/jwt'
import { ConfigModule } from './config-module'
import { ConfigService } from 'src/infrastructure/config/config'
import { ProviderName } from '../providers/provider-name'

const jwtOption: JwtModuleAsyncOptions = {
    global: true,
    imports: [ 
        ConfigModule
     ],
    useFactory: async(config: ConfigService) => {
        return {
            secret: config.jwtConfig().secret,
            signOptions: { expiresIn: '1800s' },
        }
    },
    inject: [ ProviderName.ENV_CONFIG ]
}

@Module({
    imports: [ 
        NestJwtModule.registerAsync(jwtOption)
     ],
    providers: [ jwtProvider ],
    exports: [ jwtProvider ]
})
export class JwtModule {}