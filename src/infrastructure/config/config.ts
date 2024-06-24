import { ConfigService as NestConfigService } from "@nestjs/config"

export type DbConfig = {
    srvMode: boolean
    user: string
    password: string
    serverAddress: string
    port: number
    dbName: string
    replicaSetName: string
}

type CoinMarketCap = {
    baseUrl: string
}

type JwtConfig = {
    secret: string
}

type RedisConfig = {
    url: string
    port: number
}

interface Config {
    dbConfig(): DbConfig
    coinCap(): CoinMarketCap
    jwtConfig(): JwtConfig
    redisConfig(): RedisConfig
}

export class ConfigService implements Config {
    constructor(private readonly _nestConfigService: NestConfigService) {}

    public dbConfig(): DbConfig {
        return {
            srvMode: this._nestConfigService.get<boolean>('mongo.srvMode'),
            user: this._nestConfigService.get<string>('mongo.user'),
            password: this._nestConfigService.get<string>('mongo.password'),
            serverAddress: this._nestConfigService.get<string>('mongo.serverAddress'),
            port: this._nestConfigService.get<number>('mongo.port'),
            dbName: this._nestConfigService.get<string>('mongo.dbName'),
            replicaSetName: this._nestConfigService.get<string>('mongo.replicaSetName'),
        }
    }
    
    public coinCap(): CoinMarketCap {
        return {
            baseUrl: this._nestConfigService.get<string>('coinCap.baseUrl')
        }
    }

    public redisConfig(): RedisConfig {
        return {
            url: this._nestConfigService.get<string>('redis.url'),
            port: this._nestConfigService.get<number>('redis.port')
        }
    }

    public jwtConfig(): JwtConfig {
        return {
            secret: this._nestConfigService.get<string>('jwt.secret')
        }
    }

}