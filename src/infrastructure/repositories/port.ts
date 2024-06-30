import { Db, Filter } from 'mongodb'
import { Observable, from, tap, map } from 'rxjs'
import { isNil } from 'lodash'

import { MongoRepository } from './commons/mongo-repository'
import { Port, IPortRepository, PortRepositoryError } from 'src/domain/port' 
import { PortMongoRepositoryMapper, PortMongoSchema } from './mapper/port'
import { NotFoundError } from 'src/domain/commons/errors'

type PortQuery = Filter<PortMongoSchema>

export class PortMongoRepository extends MongoRepository<Port> implements IPortRepository {
    constructor(
        db: Db,
        mapper: PortMongoRepositoryMapper
    ) {
        super(db.collection('ports'), mapper)
    }

    public findById(id: string): Observable<Port> {
        const query: PortQuery = {
            _id: id
        }

        return from(this.collection.findOne(query)).pipe(
            tap(doc => {
                if(isNil(doc)) {
                    throw new NotFoundError(PortRepositoryError.notFoundById(id))
                }
            }),
            map(doc => this.toModel(doc))
        )
    }

    public update(updatedPort: Port): Observable<string> {
        const doc = this.toDocument(updatedPort)
        const query: PortQuery = {
            _id: doc._id
        }

        delete doc._id

        const updateDoc = {
            $set: {
                ...doc,
                updatedDate: new Date()
            }
        }

        return from(this.collection.updateOne(query, updateDoc)).pipe(
            tap(res => {
                if(res.matchedCount === 0) {
                    throw new NotFoundError(PortRepositoryError.notFoundById(doc._id))
                }
            }),
            map(() => updatedPort.getId())
        )
    }
}