import { MongoClient } from 'mongodb'
import { isNil } from 'lodash'

import { DBConfig } from './mongo-db'


export class MongoClientConnector {
    constructor(private readonly _config: DBConfig) {}

    public async connect(): Promise<MongoClient> {
        const { srvMode, serverAddress, port, user, password, dbName } = this._config.dbConfig()

        const getDefaultConnection = async () => {
            const mongoUrl = `mongodb://${serverAddress}:${port}/${dbName}`

            return MongoClient.connect(mongoUrl)
        }

        const getSrvConnection = async () => {
            const authorizeInfo = isNil(user) || isNil(password) ? `` : `${user}:${encodeURIComponent(password)}`
            const uri = `mongodb+srv://${authorizeInfo}@${serverAddress}/test?retryWrites=true&w=majority`

            return MongoClient.connect(uri)
        }

        return await (srvMode ? getSrvConnection() : getDefaultConnection())
    }
}