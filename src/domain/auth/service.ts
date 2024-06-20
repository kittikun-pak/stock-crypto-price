import { Observable } from 'rxjs'
import { JwtAuthService } from './jwt-auth-service'
import { IUserRepository } from '../user'


type LogRequest = {
    email: string,
    password: string
}

type LoginResponse = {
    tokenType: string
    accessToken: string
    expiresIn: number
    refreshToken: string
}

export class AuthService {
    constructor(
        private readonly _jwtAuthService: JwtAuthService,
        private readonly _userRepository: IUserRepository
    ) {}

    public userLogin(payload: LogRequest): Observable<LoginResponse> {
        return 
    }

}