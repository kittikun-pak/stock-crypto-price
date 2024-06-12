export class Stock {
    private _companyName: string
    private _symbol: string
    private _price: number
    private _currency: string

    constructor(
        companyName: string,
        symbol: string,
        price: number,
        currency: string
    ) {
        this._companyName = companyName
        this._symbol = symbol
        this._price = price
        this._currency = currency
    }

    public getCompanyName(): string {
        return this._companyName
    }

    public setCompanyName(companyName: string) {
        this._companyName = companyName
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
        this._price = price
    }

    public getCurrency(): string {
        return this._currency
    }

    public setCurrency(currency: string) {
        this._currency = currency
    }
}