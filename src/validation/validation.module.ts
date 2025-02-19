import { MiddlewareConsumer, Module } from "@nestjs/common";
import { OrdensModule } from "../ordens/ordens.module";
import { UsersModule } from "../users/users.module";
import { ValidationController } from "./validation.controller";
import { AuthMiddleware } from '../auth/auth.middleware';
import { AuthModule } from "../auth/auth.module";

@Module({
    imports: [AuthModule,OrdensModule,UsersModule],
    controllers: [ValidationController],
    providers: [],
    exports: []
})
export class validationModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(AuthMiddleware).forRoutes('eniwhere');
    }
}
