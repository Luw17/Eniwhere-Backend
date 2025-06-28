import { Module } from "@nestjs/common";
import { OrdensService } from "./ordens.service";
import { DatabaseModule } from "../database/database.module";
import { EmailModule } from "../email/email.module";
import { UsersModule } from "../users/users.module";
import { OrdensController } from './ordens.controller';
import { OrderRepository } from "src/database/repositories/order.repository";
import { ServiceOrder } from "src/database/entities/service_order.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OrderLog } from "src/database/entities/order_log.entity";
import { OrderLogRepository } from "src/database/repositories/order-log.repository";
import { PictureRepository } from "src/database/repositories/pictures.repository";
import { Picture } from "src/database/entities/picture.entity";

@Module({
    imports: [DatabaseModule, EmailModule,UsersModule,TypeOrmModule.forFeature([ServiceOrder,OrderLog,Picture])],
    controllers: [OrdensController],
    providers: [OrdensService,OrderRepository,OrderLogRepository, PictureRepository],
    exports: [OrdensService]
})
export class OrdensModule {}