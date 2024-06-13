import { ConfigService as NestConfigService } from "@nestjs/config"

type coinMarketCap = {
    baseUrl: string
}

interface Config {
    coinCap(): coinMarketCap
}

export class ConfigService implements Config {
    constructor(private readonly _nestConfigService: NestConfigService) {}
    
    public coinCap(): coinMarketCap {
        return {
            baseUrl: this._nestConfigService.get<string>('coinCap.baseUrl')
        }
    }
}