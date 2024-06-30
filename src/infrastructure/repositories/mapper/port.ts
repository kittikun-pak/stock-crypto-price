import { isNil } from 'lodash'

import { PortStock } from 'src/domain/port/value-objects'
import { Port } from 'src/domain/port'
import { MongoRepositoryMapper } from '../commons/mongo-repository-mapper'

type StockSchema = {
    companyName: string
    symbol: string
    buyPrice: number
    quantity: number
}

export type PortMongoSchema = {
    _id: string
    userId: string
    name: string
    isActive: boolean
    stocks: StockSchema[] | null
}

export class PortMongoRepositoryMapper extends MongoRepositoryMapper<Port, PortMongoSchema> {
    public deserialize(mongoDocument: PortMongoSchema): Port {
        const {
            _id,
            userId,
            name,
            isActive,
            stocks
        } = mongoDocument

        const portStock = isNil(stocks) ? null : stocks.map(stock => this._deserializePortStock(stock))

        return Port.createFromExisting({
            id: _id,
            userId: userId,
            name: name,
            isActive: isActive,
            stocks: portStock
        })
    }

    public serialize(model: Port): PortMongoSchema {
        return {
            _id: model.getId(),
            userId: model.getUserId(),
            name: model.getName(),
            isActive: model.getIsActive(),
            stocks: isNil(model.getStocks()) ? null : model.getStocks().map(stock => this._serializeStocks(stock))
        }
    }

    private _deserializePortStock(stockDocument: StockSchema): PortStock {
        const {
            companyName,
            symbol,
            buyPrice,
            quantity
        } = stockDocument

        return new PortStock(companyName, symbol, buyPrice, quantity)
    }

    private _serializeStocks(stock: PortStock): StockSchema {
        return {
            companyName: stock.getCompanyName(),
            symbol: stock.getSymbol(),
            buyPrice: stock.getBuyPrice(),
            quantity: stock.getQuantity()
        }
    }
}