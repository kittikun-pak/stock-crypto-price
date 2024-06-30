import { Observable } from 'rxjs'

import { Port } from './model'

export interface IPortRepository {
    create(port: Port): Observable<string>
    findById(id: string): Observable<Port>
    update(updatedPort: Port): Observable<string>
}