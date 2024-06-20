import { cloneDeep } from 'lodash'

export class Entity {
    protected id: string
    protected origin: Entity | null
    protected createdAt: Date
    protected updatedAt: Date
    
    constructor() {
        this.createdAt = null
        this.updatedAt = null
        this.origin = null
    }

    public getId(): string {
        return this.id
    }

    public capture() {
        this.origin = cloneDeep(this)
    }

    public getCreatedDate(): Date | null {
        return this.createdAt
    }

    public getUpdatedDate(): Date | null {
        return this.updatedAt
    }
}