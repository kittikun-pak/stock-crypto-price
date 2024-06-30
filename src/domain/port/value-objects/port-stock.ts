import { ComparableFieldSelector, ValueObject } from 'src/domain/commons/entity/value-object'

export class PortStock extends ValueObject {
    private _companyName: string
    private _symbol: string
    private _buyPrice: number
    private _quantity: number

    constructor(companyName: string, symbol: string, buyPrice: number, quantity: number) {
        super()
        this._companyName = companyName
        this._symbol = symbol
        this._buyPrice = buyPrice
        this._quantity = quantity
    }

    public getCompanyName(): string {
        return this._companyName
    }

    public getSymbol(): string {
        return this._symbol
    }

    public getBuyPrice(): number {
        return this._buyPrice
    }

    public setBuyPrice(buyPrice: number) {
        return new PortStock(
            this.getCompanyName(),
            this.getSymbol(),
            buyPrice,
            this.getQuantity()
        )
    }

    public getQuantity(): number {
        return this._quantity
    }

    public setQuantity(quantity: number) {
        return new PortStock(
            this.getCompanyName(),
            this.getSymbol(),
            this.getBuyPrice(),
            quantity
        )
    }

    public isEqual(valueObjectToCompareWith: this): boolean {
        const comparableFields: ComparableFieldSelector[] = [
            {
                selectFieldToCompare: (valueObject: this) => valueObject.getCompanyName()
            },
            {
                selectFieldToCompare: (valueObject: this) => valueObject.getSymbol()
            },
            {
                selectFieldToCompare: (valueObject: this) => valueObject.getBuyPrice()
            },
            {
                selectFieldToCompare: (valueObject: this) => valueObject.getQuantity()
            }
        ]

        return this.isEqualByComparableFields(valueObjectToCompareWith, comparableFields)
    }
}