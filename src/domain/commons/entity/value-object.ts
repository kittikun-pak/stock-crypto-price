import { isEqual } from 'lodash'

export interface ComparableFieldSelector {
    selectFieldToCompare: (valueObject: ValueObject) => any | ValueObject | Array<ValueObject>
}
export abstract class ValueObject {
    protected id: string

    public abstract isEqual(valueObjectToCompareWith: ValueObject): boolean

    protected isEqualByComparableFields(
        valueObjectToCompareWith: this,
        fieldSelector: ComparableFieldSelector[]
    ): boolean {
        const compare = (selfValue: ValueObject | any, toCompareValue: ValueObject | any): boolean => {
            if(selfValue instanceof ValueObject && toCompareValue instanceof ValueObject) {
                return selfValue.isEqual(toCompareValue)
            }

            return isEqual(selfValue, toCompareValue)
        }

        return fieldSelector.every((fieldSelector: ComparableFieldSelector) => {
            const selfValue = fieldSelector.selectFieldToCompare(this)
            const toCompareValue = fieldSelector.selectFieldToCompare(valueObjectToCompareWith)
            if(Array.isArray(selfValue) && Array.isArray(toCompareValue)) {
                if(selfValue.length !== toCompareValue.length) {
                    return false
                }

                return selfValue.every((value, index) => compare(value, toCompareValue[index]))
            }
        }, false)
    }
}