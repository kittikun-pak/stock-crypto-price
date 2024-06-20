import { Entity } from 'src/domain/commons/entity/entity'

export abstract class MongoRepositoryMapper<M extends Entity, S> {
    public abstract serialize(model: M): S

    public abstract deserialize(mongoDocument: S): M
}