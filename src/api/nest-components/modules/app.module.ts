import { Module } from '@nestjs/common'

import { ServiceModule } from './service-module'
import { 
  StockController,
  CryptoController,
  UserController,
  AuthController,
  PortController
} from 'src/api/controllers/'
import { filterProvider } from '../providers/filter'
import { DatabaseModules } from './database-module'

@Module({
  imports: [ 
    DatabaseModules,
    ServiceModule,
  ],
  controllers: [ 
    StockController,
    CryptoController,
    UserController,
    AuthController,
    PortController
  ],
  providers: [
    ...filterProvider
  ],
})
export class AppModule {}
