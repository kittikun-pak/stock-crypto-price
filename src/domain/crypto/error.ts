import { 
    Locale,
    BadRequestErrorMap
} from "../commons/errors"

enum Domain {
    Crypto = 'Crypto'
}

export class CryptoServiceError {
    public static prefix = 'CryptoServiceError'

    public static cannotGetCoinPrice(reason: string): BadRequestErrorMap {
        return {
            domain: Domain.Crypto,
            code: this.prefix + '001',
            message: Locale.en(`cannot get coin price cause: ${reason}`)
                .th(`ไม่สามารถค้นหาราคาของเหรียญได้เนื่องจาก: ${reason}`)
                .build(),
            reasons: []
        }
    }
}