import { Db, Filter } from 'mongodb'
import { 
    Observable,
    from,
    tap,
    map 
} from 'rxjs'
import { isNil } from 'lodash'

import { 
    User, 
    IUserRepository 
} from 'src/domain/user'
import { MongoRepository } from './commons/mongo-repository'
import { 
    UserMongoRepositoryMapper, 
    UserSchema 
} from './mapper/user'
import { NotFoundError } from 'src/domain/commons/errors'
import { UserRepositoryError } from 'src/domain/user/error'

type UserQuery = Filter<UserSchema>

export class UserMongoRepository extends MongoRepository<User> implements IUserRepository {
    constructor(
        private readonly db: Db,
        mapper: UserMongoRepositoryMapper
    ) {
        super(db.collection('users'), mapper)
    }

    public findByEmail(email: string): Observable<User> {
        const query: UserQuery = {
            email
        }

        return from(this.collection.find(query)).pipe(
            tap((doc: UserSchema) => {
                if(isNil(doc)) {
                    throw new NotFoundError(UserRepositoryError.notFoundByEmail(email))
                }
            }),
            map(doc => this.toModel(doc))
        )
    }
}