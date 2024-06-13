import { 
    Controller,
    Inject,
    Get,
    Query
} from "@nestjs/common"

import { ProviderName } from "../nest-components/providers/provider-name";
import { CryptoService } from "src/domain/crypto/service";
import { ValidationPipe } from "../nest-components/pipes/validation-pipe";
import { GetCryptoRequestValidator } from "../request-validator/crypto/get-crypto";

@Controller('/crypto')
export class CryptoController {
    constructor(
        @Inject(ProviderName.CRYPTO_SERVICE) private readonly _cryptoService: CryptoService
    ) {}

    @Get('/')
    public getCrypto(
        @Query(new ValidationPipe) query: GetCryptoRequestValidator
    ) {
        const coinName = query.getByCoinName()

        return this._cryptoService.getCrypto(coinName)
    }
}