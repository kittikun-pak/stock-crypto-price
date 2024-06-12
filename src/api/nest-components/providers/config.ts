import { Provider } from "@nestjs/common"
import { ConfigService as NestConfigService} from "@nestjs/config"

import { ProviderName } from "./provider-name"
import { ConfigService } from "src/infrastructure/config/config"

export const configProvider: Provider = {
    provide: ProviderName.ENV_CONFIG,
    useFactory: (configService: NestConfigService) => {
        return new ConfigService(configService)
    },
    inject: [ NestConfigService ]
}