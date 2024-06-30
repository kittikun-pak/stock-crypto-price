import { Module } from '@nestjs/common'

import { portRepository, userRepository } from '../providers/repository';
import { DatabaseModules } from './database-module';

@Module({
    imports: [
        DatabaseModules
    ],
    providers: [
        userRepository,
        portRepository
    ],
    exports: [
        userRepository,
        portRepository
    ]
})
export class RepositoryModule {}