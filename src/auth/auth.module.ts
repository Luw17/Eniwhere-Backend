import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UsersModule } from "../users/users.module";
import { AuthController } from "./auth.controller";
import { StoresModule } from "../stores/stores.module";
import { AdminsModule } from "../admins/admins.module";
import { RedisModule } from "src/redis/redis.module";
import { WorkersModule } from "src/workers/workers.module";

@Module({
    imports: [UsersModule,StoresModule,AdminsModule,RedisModule,WorkersModule],
    controllers: [AuthController],
    providers: [AuthService],
    exports: [AuthService],
})
export class AuthModule {}
