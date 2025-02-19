import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { validationModule } from './validation/validation.module';

@Module({
  imports: [validationModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
