import { Crypto } from "./model"

type CryptoDto = {
    coinName: string
    symbol: string
    price: number
    currency: string
}

export const createCryptoDto = (crypto: Crypto): CryptoDto => {
    return {
        coinName: crypto.getCoinName(),
        symbol: crypto.getSymbol(),
        price: crypto.getPrice(),
        currency: crypto.getCurrency()
    }
}