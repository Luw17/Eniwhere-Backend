import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UsersModule } from "../users/users.module";
import { AuthController } from "./auth.controller";
import { StoresModule } from "../stores/stores.module";
import { AdminsModule } from "../admins/admins.module";

@Module({
    imports: [UsersModule,StoresModule,AdminsModule],
    controllers: [AuthController],
    providers: [AuthService],
    exports: [AuthService],
})
export class AuthModule {}
