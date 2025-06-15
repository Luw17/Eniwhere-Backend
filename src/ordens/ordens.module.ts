import { Module } from "@nestjs/common";
import { OrdensService } from "./ordens.service";
import { DatabaseModule } from "../database/database.module";
import { EmailModule } from "../email/email.module";
import { UsersModule } from "../users/users.module";
import { OrdensController } from './ordens.controller';

@Module({
    imports: [DatabaseModule, EmailModule,UsersModule],
    controllers: [OrdensController],
    providers: [OrdensService],
    exports: [OrdensService]
})
export class OrdensModule {}