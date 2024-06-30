import { NotFoundErrorMap, Locale } from '../commons/errors'


enum Domain {
    Port = 'port'
}

export class PortRepositoryError {
    public static prefix = 'PortRepositoryError'

    public static notFoundById(id: string): NotFoundErrorMap {
        return {
            domain: Domain.Port,
            code: this.prefix + '001',
            message: Locale.en(`port not found by id: ${id}`)
                .th(`ไม่พบพอร์ต id: ${id}`)
                .build(),
            resourceId: id
        }
    }
}