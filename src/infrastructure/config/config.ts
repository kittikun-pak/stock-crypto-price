import { ConfigService as NestConfigService } from "@nestjs/config"

type RedisConfig = {
    url: string
    port: number
    password: string
}

interface Config {
    
}

export class ConfigService implements Config {
    constructor(private readonly _nestConfigService: NestConfigService) {}

    
}