import { Db, MongoClient } from 'mongodb'

import { DbConfig } from '../config/config'

export interface DBConfig {
    dbConfig(): DbConfig
}

export class MongoDatabase {
    constructor(
        private readonly _config: DBConfig,
        private readonly _mongoClient: MongoClient
    ) {}

    public getDatabase(): Db {
        const { dbName }  = this._config.dbConfig()

        return this._mongoClient.db(dbName)
    }
}