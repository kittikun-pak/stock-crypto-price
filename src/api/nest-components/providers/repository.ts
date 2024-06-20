import { Db } from 'mongodb'

import { Provider } from '@nestjs/common'
import { ProviderName } from './provider-name'
import { UserMongoRepository } from 'src/infrastructure/repositories/user'
import { UserMongoRepositoryMapper } from 'src/infrastructure/repositories/mapper/user'

export const userRepository: Provider = {
    provide: ProviderName.USER_REPOSITORY,
    useFactory: (db: Db) => {
        return new UserMongoRepository(db, new UserMongoRepositoryMapper())
    },
    inject: [ ProviderName.MONGO_DB]
}