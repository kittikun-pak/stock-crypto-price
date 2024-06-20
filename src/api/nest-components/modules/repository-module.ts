import { Module } from '@nestjs/common'

import { userRepository } from '../providers/repository';
import { DatabaseModules } from './database-module';

@Module({
    imports: [
        DatabaseModules
    ],
    providers: [
        userRepository
    ],
    exports: [
        userRepository
    ]
})
export class RepositoryModule {}