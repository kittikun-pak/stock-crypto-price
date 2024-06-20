import { Provider } from '@nestjs/common'
import { MongoClient } from 'mongodb'

import { ProviderName } from './provider-name'
import { MongoDatabase } from 'src/infrastructure/database/mongo-db'
import { DBConfig } from 'src/infrastructure/database/mongo-db'
import { MongoClientConnector } from 'src/infrastructure/database/mongo-client'

export const mongoClientProvider: Provider = {
    provide: ProviderName.MONGO_CLIENT,
    useFactory: (config: DBConfig) => {
        const db = new MongoClientConnector(config)

        return db.connect()
    },
    inject: [ ProviderName.ENV_CONFIG ]

}

export const mongoDbProvider: Provider = {
    provide: ProviderName.MONGO_DB,
    useFactory: (config: DBConfig , mongoClient: MongoClient) => {
        const db = new MongoDatabase(config, mongoClient)

        return db.getDatabase()
    },
    inject: [ ProviderName.ENV_CONFIG,  ProviderName.MONGO_CLIENT ]
}