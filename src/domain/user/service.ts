import { Inject } from '@nestjs/common'
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager'
import { 
    Observable,
    delayWhen,
    map
} from 'rxjs'

import { 
    UserDomainService,
    CreateUserInput
} from './domain-service'
import { IUserRepository } from './repository'


export class UserService {
    constructor(
        @Inject(CACHE_MANAGER) private readonly _cacheRedis: Cache,
        private readonly _userRepository: IUserRepository,
        private readonly _userDomainService: UserDomainService,
    ) {}

    public createUser(input: CreateUserInput): Observable<{ id: string }> {
        return this._userDomainService.createUser(input).pipe(
            delayWhen(user => this._userRepository.create(user)),
            map(user => ({ id: user.getId() }))
        )
    }
}