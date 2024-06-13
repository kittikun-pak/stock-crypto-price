import { Module } from '@nestjs/common'

import { ServiceModule } from './service-module'
import { StockController } from 'src/api/controllers/stock-controller'
import { filterProvider } from '../providers/filter'
import { CryptoController } from 'src/api/controllers/crypto-controller'


@Module({
  imports: [ 
    ServiceModule,
  ],
  controllers: [ 
    StockController,
    CryptoController 
  ],
  providers: [
    ...filterProvider
  ],
})
export class AppModule {}
