import { Db } from 'mongodb'

import { Provider } from '@nestjs/common'
import { ProviderName } from './provider-name'
import { 
    UserMongoRepository,
    PortMongoRepository
} from 'src/infrastructure/repositories'
import { 
    PortMongoRepositoryMapper,
    UserMongoRepositoryMapper 
} from 'src/infrastructure/repositories/mapper'
import {  } from 'src/infrastructure/repositories'

export const userRepository: Provider = {
    provide: ProviderName.USER_REPOSITORY,
    useFactory: (db: Db) => {
        return new UserMongoRepository(db, new UserMongoRepositoryMapper())
    },
    inject: [ ProviderName.MONGO_DB]
}

export const portRepository: Provider = {
    provide: ProviderName.PORT_REPOSITORY,
    useFactory: (db: Db) => {
        return new PortMongoRepository(db, new PortMongoRepositoryMapper())
    },
    inject: [ ProviderName.MONGO_DB ]
}