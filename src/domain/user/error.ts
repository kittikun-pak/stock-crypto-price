import { BadRequestErrorMap, Locale, NotFoundErrorMap } from '../commons/errors'

enum Domain {
    User = 'user'
}

export class UserRepositoryError {
    public static prefix = 'UserRepositoryError'

    public static notFoundByEmail(email: string): NotFoundErrorMap {
        return {
            domain: Domain.User,
            code: this.prefix + '001',
            message: Locale.en(`user not found by email: ${email}`)
                .th(`ไม่พบผู้ใช้งาน อีเมล: ${email}`)
                .build(),
            resourceId: email
        }
    }

    public static notFoundById(id: string): NotFoundErrorMap {
        return {
            domain: Domain.User,
            code: this.prefix + '002',
            message: Locale.en(`user not found by id: ${id}`)
                .th(`ไม่พบผู้ใช้งาน id: ${id}`)
                .build(),
            resourceId: id
        }
    }
}

export class UserDomainServiceError {
    public static prefix = 'UserDomainServiceError'

    public static cannotCreateUserCauseUserIsExists(): BadRequestErrorMap {
        return {
            domain: Domain.User,
            code: this.prefix + '001',
            message: Locale.en(`cannot create user cause user is already exists`)
                .th(`ไม่สามารถลงทะเบียนผู้ใช้งานได้ เนื่องจากอีเมลนี้ถูกลงทะเบียนเรียบร้อยแล้ว`)
                .build(),
            reasons: []
        }
    }
}