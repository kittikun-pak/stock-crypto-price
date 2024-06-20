import {
    Controller,
    Post,
    Inject,
    Body
} from '@nestjs/common'

import { ProviderName } from '../nest-components/providers/provider-name'
import { 
    CreateUserInput, 
    UserService 
} from '../../domain/user'
import { ValidationPipe } from '../nest-components/pipes/validation-pipe'
import { CreateUserRequestValidator } from '../request-validator/user/create-user'

@Controller('user')
export class UserController {
    constructor(
        @Inject(ProviderName.USER_SERVICE) private readonly _userService: UserService
    ){}

    @Post('/')
    public createUser(
        @Body(new ValidationPipe) body: CreateUserRequestValidator
    ) {
        const input: CreateUserInput = {
            email: body.email,
            password: body.password
        }

        return this._userService.createUser(input)
    }
}