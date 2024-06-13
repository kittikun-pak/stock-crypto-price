import { PipeTransform, Injectable, ArgumentMetadata, HttpException, HttpStatus } from "@nestjs/common";
import { plainToClass } from "class-transformer";
import { ValidationError, validate } from "class-validator";
import { isEmpty } from "lodash";
import { BadRequestError, Locale } from "src/domain/commons/errors";

@Injectable()
export class ValidationPipe<T = any> implements PipeTransform<T> {
    public async transform(value: T, { metatype }: ArgumentMetadata) {
        const object = plainToClass(metatype, value)
        const mappedErrors = await this.validate(object)
        

        if(isEmpty(mappedErrors) === false) {
            throw new BadRequestError({
                domain: 'Stock-Crypto-Price',
                code: 'invalid input',
                message: Locale.en(`invalid input`).build(),
                reasons: mappedErrors.map(err => Locale.en(err.message).build())
            })
        }
        
        return object
    }

    public async validate(transObj: any) {
        const validationError: ValidationError[] = await validate(transObj)
        const flattenErrors: ValidationError[] = this._flatValidationError(validationError)
        const mappedErrors = flattenErrors.map(error => ({ message: Object.values(error?.constraints).join(', ') }))

        return mappedErrors
    }

    private _flatValidationError(errors: ValidationError[], parentKey?: string): ValidationError[] {
        const flattenErrors = errors.reduce((acc, error) => {
            const fieldName = [parentKey, error.property].filter(key => isEmpty(key) === false).join('.')

            error.property = fieldName

            if(isEmpty(error.children) === false) {
                return acc.concat(this._flatValidationError(error.children, fieldName))
            }

            acc.push(error)

            return acc
        }, [])

        return flattenErrors
    }
}