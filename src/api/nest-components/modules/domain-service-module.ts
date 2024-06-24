import { Module } from '@nestjs/common'

import { userDomainServiceProvider } from '../providers/domain-service'
import { RepositoryModule } from './repository-module'

@Module({
    imports: [ RepositoryModule ],
    providers: [
        userDomainServiceProvider
    ],
    exports: [
        userDomainServiceProvider
    ]
})
export class DomainServiceModule {}