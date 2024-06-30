import { 
    Body,
    Controller, 
    Inject, 
    Post, 
    UseInterceptors 
} from '@nestjs/common'

import { AttachDataInterCeptor, TokenAttachmentData } from '../nest-components/interceptors/attach-data'
import { ProviderName } from '../nest-components/providers/provider-name'
import { CreatePortInput, PortService } from 'src/domain/port'
import { ValidationPipe } from '../nest-components/pipes/validation-pipe'
import { TokenAttachment } from '../nest-components/decorators/token-attachment'
import { CreatePortRequestValidator } from '../request-validator/port/create-port'

@UseInterceptors(AttachDataInterCeptor)
@Controller('port')
export class PortController {
    constructor(
        @Inject(ProviderName.PORT_SERVICE) private readonly _portService: PortService
    ) {}

    @Post('/')
    public createPort(
        @TokenAttachment() attachment: TokenAttachmentData,
        @Body(new ValidationPipe) body: CreatePortRequestValidator
    ) {
        const input: CreatePortInput = {
            userId: attachment.user.userId,
            name: body.getName()
        }

        return this._portService.createPort(input)
    }
}