import { Module } from '@nestjs/common'

import { 
    mongoClientProvider, 
    mongoDbProvider 
} from '../providers/database'
import { ConfigModule } from './config-module'

@Module({
    imports: [
        ConfigModule
    ],
    providers: [ 
        mongoDbProvider,
        mongoClientProvider
    ],
    exports: [ mongoDbProvider ]
})
export class DatabaseModules {}