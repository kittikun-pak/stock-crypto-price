import { Module } from '@nestjs/common'

import { userDomainServiceProvider } from '../providers/domain-service'

@Module({
    imports: [],
    providers: [
        userDomainServiceProvider
    ],
    exports: [
        userDomainServiceProvider
    ]
})
export class DomainServiceModule {}