import { HttpException } from "@nestjs/common"

import { 
    Locale,
    Lang
} from "./locale"

export abstract class CustomerError extends HttpException {
    constructor(response: string | Record<string, any>, status: number) {
        super(response, status)
    }

    public abstract localMessage: Locale

    public abstract getSchema(lang?: Lang)
}