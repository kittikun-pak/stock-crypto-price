import {
    Controller,
    Get,
    Post,
    Inject,
    Body,
    UseInterceptors,
} from '@nestjs/common'

import { ProviderName } from '../nest-components/providers/provider-name'
import { TokenAttachment } from '../nest-components/decorators/token-attachment'
import { AttachDataInterCeptor, TokenAttachmentData } from '../nest-components/interceptors/attach-data'
import { 
    CreateUserInput, 
    UserService 
} from '../../domain/user'
import { ValidationPipe } from '../nest-components/pipes/validation-pipe'
import { CreateUserRequestValidator } from '../request-validator/user/create-user'

@UseInterceptors(AttachDataInterCeptor)
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

    @Get('/me')
    public getUser(
        @TokenAttachment() attachment: TokenAttachmentData
    ) {
        const { 
            user: {
                userId
            } 
        } = attachment

        return this._userService.getUserById(userId)
    }
}