import { v4 as uuid } from 'uuid'

import { Entity } from '../commons/entity/entity'
import { PortStock } from './value-objects'

type PortSchema = {
    id: string
    userId: string
    name: string
    isActive: boolean
    stocks: PortStock[]
}

export class Port extends Entity {
    private _userId: string
    private _name: string
    private _isActive: boolean
    private _stocks: PortStock[] | null

    public static createFromExisting(obj: PortSchema): Port {
        const {
            id,
            userId,
            name,
            isActive,
            stocks
        } = obj

        const port = new Port(userId, name)
        port.id = id
        port._isActive = isActive
        port._stocks = stocks

        return port
    }
   
    constructor(userId: string, name: string) {
        super()
        this.id = uuid()
        this._userId = userId,
        this._name = name,
        this._isActive = true
        this._stocks = null
    }

    public getUserId(): string {
        return this._userId
    }

    public getName(): string {
        return this._name
    }

    public getIsActive(): boolean {
        return this._isActive
    }

    public setIsActive(isActive: boolean): void {
        this._isActive = isActive
    } 

    public getStocks(): PortStock[] | null {
        return this._stocks
    }

    public setStocks(stocks: PortStock[]): void {
        this._stocks = stocks
    }
}