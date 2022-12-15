import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RabbitMqModule } from './rabit-mq/rabbit-mq.module';
import { EmailModule } from './email/email.module';

@Module({
  imports: [RabbitMqModule, EmailModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
