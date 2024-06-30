import { Provider } from '@nestjs/common'

import { ProviderName } from './provider-name'
import { IUserRepository, UserDomainService } from 'src/domain/user'
import { IPortRepository, PortDomainService } from 'src/domain/port'

export const userDomainServiceProvider: Provider = {
    provide: ProviderName.USER_DOMAIN_SERVICE,
    useFactory: (userRepo: IUserRepository) => {
        return new UserDomainService(userRepo)
    },
    inject: [ ProviderName.USER_REPOSITORY ]
}

export const portDomainServiceProvider: Provider = {
    provide: ProviderName.PORT_DOMAIN_SERVICE,
    useFactory: (portRepo: IPortRepository) => {
        return new PortDomainService(portRepo)
    },
    inject: [ ProviderName.PORT_REPOSITORY ]
}