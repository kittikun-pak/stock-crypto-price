import { Provider } from "@nestjs/common"
import { APP_FILTER } from "@nestjs/core"
import { ErrorExceptionFilter } from "../filters/error-exception"
import { HttpExceptionFilter } from "../filters/http-error-exception"

export const filterProvider: Provider[] = [
    {
        provide: APP_FILTER,
        useClass: ErrorExceptionFilter
    },
    {
        provide: APP_FILTER,
        useClass: HttpExceptionFilter
    }
]