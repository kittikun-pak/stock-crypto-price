import { JwtService } from '@nestjs/jwt'
import { SignOptions, VerifyOptions } from 'jsonwebtoken'
import { Observable, from } from 'rxjs'

interface JwtAuth {
    sign(payload: any, options?: SignOptions): Observable<string>
    verify<T>(token: string, options?: VerifyOptions): Observable<T>
}

export class JwtAuthService implements JwtAuth {
    constructor(private readonly _jwtService: JwtService) {}
    
    public sign(payload: any, options: SignOptions = {}): Observable<string> {
        return from(this._jwtService.signAsync(payload, options))
    }

    public verify<T>(token: string, options: SignOptions = {}): Observable<T> {
        return from(this._jwtService.verifyAsync(token, options))
    }
}