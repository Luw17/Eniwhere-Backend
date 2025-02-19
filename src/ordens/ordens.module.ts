import { Module } from "@nestjs/common";
import { OrdensService } from "./ordens.service";
import { DatabaseModule } from "../database/database.module";
import { EmailModule } from "../email/email.module";
import { UsersModule } from "../users/users.module";

@Module({
    imports: [DatabaseModule, EmailModule,UsersModule],
    controllers: [],
    providers: [OrdensService],
    exports: [OrdensService]
})
export class OrdensModule {}