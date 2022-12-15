import {Module} from '@nestjs/common';
import {EmailController} from "./Presentation/email-controller";
import {RabbitMqModule} from "../rabit-mq/rabbit-mq.module";
import {SendEmailUseCase} from "./Application/UseCases/send-email.useCase";

@Module({
    controllers: [EmailController],
    imports: [RabbitMqModule],
    providers: [SendEmailUseCase]
})
export class EmailModule {
}
