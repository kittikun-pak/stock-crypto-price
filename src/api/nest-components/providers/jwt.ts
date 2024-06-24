import { Provider } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

import { ProviderName } from './provider-name'
import { JwtAuthService } from 'src/domain/auth/jwt-auth-service'


export const jwtProvider: Provider = {
    provide: ProviderName.JWT_SERVICE,
    useFactory: (jwtService: JwtService) => {
        return new JwtAuthService(jwtService)
    },
    inject: [ JwtService ]
}