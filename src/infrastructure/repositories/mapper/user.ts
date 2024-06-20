import { isNil } from 'lodash'

import { User } from 'src/domain/user'
import { MongoRepositoryMapper } from '../commons/mongo-repository-mapper'
import { UserAuthentication } from 'src/domain/user/value-objects'

type UserAuthenticationSchema = {
    password: string
    salt: string
}

export type UserSchema = {
    _id: string
    email: string
    authentication: UserAuthenticationSchema | null
}

export class UserMongoRepositoryMapper extends MongoRepositoryMapper<User, UserSchema> {
    public deserialize(mongoDocument: UserSchema): User {
        const {
            _id, 
            email, 
            authentication
        } = mongoDocument

        const userAuthentication = isNil(authentication) ? null : new UserAuthentication(authentication.password, authentication.salt)

        return User.createFromExisting({
            id: _id, 
            email: email, 
            authentication: userAuthentication
        })
    }

    public serialize(model: User): UserSchema {
        return {
            _id: model.getId(),
            email: model.getEmail(),
            authentication: isNil(model.getAuthentication()) ? null : this._serializationAuthentication(model.getAuthentication())
        }
    }

    private _serializationAuthentication(authentication: UserAuthentication): UserAuthenticationSchema {
        return {
            password: authentication.getPassword(),
            salt: authentication.getSalt()
        }
    }
}