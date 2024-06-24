import { Provider } from '@nestjs/common'

import { ProviderName } from './provider-name'
import { IUserRepository, UserDomainService } from 'src/domain/user'

export const userDomainServiceProvider: Provider = {
    provide: ProviderName.USER_DOMAIN_SERVICE,
    useFactory: (userRepo: IUserRepository) => {
        return new UserDomainService(userRepo)
    },
    inject: [ ProviderName.USER_REPOSITORY ]
}