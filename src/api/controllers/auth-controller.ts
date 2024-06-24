import {
    Controller,
    Post,
    Inject,
    Body,
    HttpCode
} from '@nestjs/common'

import { ProviderName } from '../nest-components/providers/provider-name'
import { ValidationPipe } from '../nest-components/pipes/validation-pipe'
import { AuthService } from 'src/domain/auth/service'
import { UserLoginRequestValidator } from '../request-validator/auth'


@Controller('auth')
export class AuthController {
    constructor(
        @Inject(ProviderName.AUTH_SERVICE) private readonly _authService: AuthService
    ){}

    @Post('/login')
    @HttpCode(200)
    public login(
        @Body(new ValidationPipe) body: UserLoginRequestValidator
    ) {
        const input = body.getPayload()

        return this._authService.userLogin(input)
    }
}