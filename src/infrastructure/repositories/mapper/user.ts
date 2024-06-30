import { isNil } from 'lodash'

import { User } from 'src/domain/user'
import { MongoRepositoryMapper } from '../commons/mongo-repository-mapper'
import { UserAuthentication } from 'src/domain/user/value-objects'

type UserAuthenticationSchema = {
    password: string
    salt: string
}

export type UserMongoSchema = {
    _id: string
    email: string
    authentication: UserAuthenticationSchema | null
    balance: number
}

export class UserMongoRepositoryMapper extends MongoRepositoryMapper<User, UserMongoSchema> {
    public deserialize(mongoDocument: UserMongoSchema): User {
        const {
            _id, 
            email, 
            authentication,
            balance
        } = mongoDocument

        const userAuthentication = isNil(authentication) ? null : new UserAuthentication(authentication.password, authentication.salt)

        return User.createFromExisting({
            id: _id, 
            email: email, 
            authentication: userAuthentication,
            balance: balance
        })
    }

    public serialize(model: User): UserMongoSchema {
        return {
            _id: model.getId(),
            email: model.getEmail(),
            authentication: isNil(model.getAuthentication()) ? null : this._serializationAuthentication(model.getAuthentication()),
            balance: model.getBalance()
        }
    }

    private _serializationAuthentication(authentication: UserAuthentication): UserAuthenticationSchema {
        return {
            password: authentication.getPassword(),
            salt: authentication.getSalt()
        }
    }
}