import { Module } from "@nestjs/common"
import { readFileSync } from "fs"
import { join } from "path"
import { ConfigModule as NestConfigModule } from "@nestjs/config"

import { configProvider } from "../providers/config"

const configuration = () => {
    const environment: string = process.env.NODE_ENV ?? 'local'
    const filePath: string = join(process.cwd(), 'config', `${environment}.json`)
    const configObj  = JSON.parse(readFileSync(filePath, { encoding: 'utf8' }))

    return configObj
}

const configModule = NestConfigModule.forRoot({
    load: [configuration]
}) 

@Module({
    imports: [configModule ],
    providers: [ configProvider ],
    exports: [ configProvider ]
})
export class ConfigModule {}