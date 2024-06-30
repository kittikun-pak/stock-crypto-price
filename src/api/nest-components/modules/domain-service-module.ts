import { Module } from '@nestjs/common'

import { portDomainServiceProvider, userDomainServiceProvider } from '../providers/domain-service'
import { RepositoryModule } from './repository-module'

@Module({
    imports: [ RepositoryModule ],
    providers: [
        userDomainServiceProvider,
        portDomainServiceProvider
    ],
    exports: [
        userDomainServiceProvider,
        portDomainServiceProvider
    ]
})
export class DomainServiceModule {}