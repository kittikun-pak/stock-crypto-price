export class Crypto {
    private _coinName: string
    private _symbol: string
    private _price: number
    private _currency: string

    constructor(coinName: string, symbol:string, price: number, currency: string) {
        this._coinName = coinName
        this._symbol = symbol
        this._price = price
        this._currency = currency
    }

    public getCoinName(): string {
        return this._coinName
    }

    public setCoinName(coinName: string) {
        this._coinName = coinName
    }

    public getSymbol(): string {
        return this._symbol
    }

    public setSymbol(symbol: string) {
        this._symbol = symbol
    }

    public getPrice(): number {
        return this._price
    }

    public setPrice(price: number) {
        return this._price = price
    }

    public getCurrency(): string {
        return this._currency
    }

    public setCurrency(currency: string) {
        this._currency = currency
    }
}