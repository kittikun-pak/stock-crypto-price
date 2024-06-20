import { Db } from 'mongodb'

import { 
    User, 
    UserRepository 
} from 'src/domain/user'
import { MongoRepository } from './commons/mongo-repository'
import { UserMongoRepositoryMapper } from './mapper/user'


export class UserMongoRepository extends MongoRepository<User> implements UserRepository {
    constructor(
        private readonly db: Db,
        mapper: UserMongoRepositoryMapper
    ) {
        super(db.collection('users'), mapper)
    }

}