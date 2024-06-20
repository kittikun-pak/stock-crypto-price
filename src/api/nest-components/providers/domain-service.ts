import { Provider } from '@nestjs/common'

import { ProviderName } from './provider-name'
import { UserDomainService } from 'src/domain/user'

export const userDomainServiceProvider: Provider = {
    provide: ProviderName.USER_DOMAIN_SERVICE,
    useFactory: () => {
        return new UserDomainService()
    },
    inject: []
}