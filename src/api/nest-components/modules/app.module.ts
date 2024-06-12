import { Module } from '@nestjs/common'

import { ServiceModule } from './service-module'
import { StockController } from 'src/api/controllers/stock-controller'
import { filterProvider } from '../providers/filter'


@Module({
  imports: [ 
    ServiceModule,
  ],
  controllers: [ StockController ],
  providers: [
    ...filterProvider
  ],
})
export class AppModule {}
