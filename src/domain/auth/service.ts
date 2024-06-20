import { Observable } from 'rxjs'
import { JwtAuthService } from './jwt-auth-service'
import { UserRepository } from '../user'


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
        private readonly _userRepository: UserRepository
    ) {}

    public userLogin(payload: LogRequest): Observable<LoginResponse> {
        return 
    }

}