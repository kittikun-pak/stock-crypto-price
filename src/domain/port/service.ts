import { Observable, delayWhen, map, catchError, throwError } from 'rxjs'

import { CreatePortInput, PortDomainService } from './domain-service'
import { IPortRepository } from './repository'

export class PortService {
    constructor(
        private readonly _portRepository: IPortRepository,
        private readonly _portDomainService: PortDomainService
    ) {}

    public createPort(input: CreatePortInput): Observable<{ id: string }> {
        return this._portDomainService.createPort(input).pipe(
            delayWhen(port => this._portRepository.create(port)),
            map(port => ({ id: port.getId()})),
            catchError(err => throwError(() => err))
        )
    }
}