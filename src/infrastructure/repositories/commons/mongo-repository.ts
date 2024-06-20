import { Collection, OptionalUnlessRequiredId } from 'mongodb'
import { 
    of, 
    map,
    mergeMap 
} from 'rxjs'

import { Entity } from 'src/domain/commons/entity/entity'
import { MongoRepositoryMapper } from './mongo-repository-mapper'
import { Observable } from 'rxjs'

export type MongoBaseSchema = {
    _id: string
    createdAt?: Date
    updatedAt?: Date
}

export class MongoRepository<M extends Entity, S extends MongoBaseSchema = MongoBaseSchema> {
    constructor(
        protected readonly collection: Collection<S>,
        private readonly mapper: MongoRepositoryMapper<M, S>
    ) {}

    public create(model: M): Observable<string> {
        Object.assign(model, { createdAt: new Date(), updatedAt: new Date() })

        return of(model).pipe(
            map(model => this.toDocument(model)),
            mergeMap(doc => this.collection.insertOne(doc as OptionalUnlessRequiredId<S>)),
            map(result => result.insertedId)
        )
    }

    protected toDocument(model: M): S {
        return this.mapper.serialize(model)
    }

    protected toModel(mongoDocument: S): M {
        const model = this.mapper.deserialize(mongoDocument)
        
        return model
    }
}