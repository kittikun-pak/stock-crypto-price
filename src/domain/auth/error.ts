import { Locale, UnauthorizedErrorMap } from "../commons/errors";

enum Domain {
    Auth = 'Auth'
}

export class AuthorizedServiceError {
    public static prefix = 'AuthService'

    public static InvalidEmailOrPassword(): UnauthorizedErrorMap {
        return {
            domain: Domain.Auth,
            code: this.prefix + '001',
            message: Locale.en(`Invalid Email or Password`).build()
        }
    }

    public static cannotSigningJwtToken(message: string): UnauthorizedErrorMap {
        return {
            domain: Domain.Auth,
            code: this.prefix + '002',
            message: Locale.en(`cannot signing jwt token cause: ${message}`)
                .th(`ไม่สามารถสร้าง jwt token ได้เนื่องจาก: ${message}`)
                .build()
        }
    }

    public static headerRequired(): UnauthorizedErrorMap {
        return {
            domain: Domain.Auth,
            code: this.prefix + '003',
            message: Locale.en('Authorization require in header payload.').build(),
        }
    }

    public  static verifyJwtTokenError(message: string): UnauthorizedErrorMap {
        return {
            domain: Domain.Auth,
            code: this.prefix + '004',
            message: Locale.en(`jwt token verify error (message: ${message}).`).build(),
        }
    }

    public static invalidToken(): UnauthorizedErrorMap {
        return {
            domain: Domain.Auth,
            code: this.prefix + '005',
            message: Locale.en(`Invalid token`).build(),
        }
    }
}