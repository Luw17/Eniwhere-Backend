import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { DatabaseModule } from "src/database/database.module";
import { AddressModule } from "src/address/address.module";
import { AddressService } from "src/address/address.service";

@Module({
    imports: [DatabaseModule,AddressModule],
    controllers: [],
    providers: [UsersService,AddressService],
    exports: [UsersService],
})
export class UsersModule {}