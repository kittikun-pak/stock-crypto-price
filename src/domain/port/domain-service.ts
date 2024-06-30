import { Observable, of } from 'rxjs'

import { IPortRepository } from './repository'
import { Port } from './model'

export type CreatePortInput = {
    userId: string
    name: string
}

export class PortDomainService {
    constructor(private readonly _portRepo: IPortRepository) {}

    public createPort(input: CreatePortInput): Observable<Port> {
        const createPort = (input: CreatePortInput): Port => {
            return new Port(input.userId, input.name)
        }

        return of(createPort(input))
    }
}