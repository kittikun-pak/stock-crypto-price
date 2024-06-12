import { Stock } from "./model"

type StockDto = {
    companyName: string
    symbol: string
    price: number
    currency: string
}

export const createStockDto = (stock: Stock): StockDto => {
    return {
        companyName: stock.getCompanyName(),
        symbol: stock.getSymbol(),
        price: stock.getPrice(),
        currency: stock.getCurrency()
    }
}