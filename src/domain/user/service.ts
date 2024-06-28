import { Inject } from '@nestjs/common'
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager'
import { 
    Observable,
    catchError,
    delayWhen,
    map,
    throwError
} from 'rxjs'

import { 
    UserDomainService,
    CreateUserInput
} from './domain-service'
import { IUserRepository } from './repository'
import { UserDto, createUserDto } from './dto'


export class UserService {
    constructor(
        @Inject(CACHE_MANAGER) private readonly _cacheRedis: Cache,
        private readonly _userRepository: IUserRepository,
        private readonly _userDomainService: UserDomainService,
    ) {}

    public getUserById(id: string): Observable<UserDto> {
        return this._userRepository.findById(id).pipe(map(user => createUserDto(user)))
    }

    public createUser(input: CreateUserInput): Observable<{ id: string }> {
        return this._userDomainService.createUser(input).pipe(
            delayWhen(user => this._userRepository.create(user)),
            map(user => ({ id: user.getId() })),
            catchError(err => throwError(() => err))
        )
    }
}