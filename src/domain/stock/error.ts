import { 
    Locale,
    BadRequestErrorMap
} from "../commons/errors"

enum Domain {
    Stock = 'stock'
}

export class StockServiceError {
    public static prefix = 'StockServiceError'

    public static cannotGetCompanyInfo(name: string): BadRequestErrorMap {
        return {
            domain: Domain.Stock,
            code: this.prefix + '001',
            message: Locale.en(`cannot get company info from: ${name}`)
            .th(`ไม่สามารถค้นหาข้อมูลของบริษัท: ${name}`)
            .build(),
            reasons: []
        }
    }

    public static cannotGetStockPrice(reason: string): BadRequestErrorMap {
        return {
            domain: Domain.Stock,
            code: this.prefix + '002',
            message: Locale.en(`cannot get stock price cause: ${reason}`)
                .th(`ไม่สามารถค้นหาราคาของหุ้นได้เนื่องจาก: ${reason}`)
                .build(),
            reasons: []
        }
    }
}