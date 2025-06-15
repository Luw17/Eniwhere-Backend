import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { DatabaseModule } from "src/database/database.module";
import { AddressModule } from "src/address/address.module";
import { UsersController } from './users.controller';
import { UserRepository } from "src/database/repositories/user.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppUser } from "src/database/entities/user.entity";

@Module({
    imports: [DatabaseModule,AddressModule,TypeOrmModule.forFeature([AppUser])],
    controllers: [UsersController],
    providers: [UsersService,UserRepository],
    exports: [UsersService],
})
export class UsersModule {}