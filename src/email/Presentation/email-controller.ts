import {RabbitMqService} from "../../rabit-mq/Infra/services/rabbit-mq.service";
import {Ctx, MessagePattern, Payload, RmqContext} from "@nestjs/microservices";
import {Controller} from "@nestjs/common";
import {SendEmailUseCase} from "../Application/UseCases/send-email.useCase";
import {ProcessResponse} from "../../common/core/utils/processResponse";

@Controller()
export class EmailController {

    constructor(private readonly sendEmailUseCase: SendEmailUseCase) {
    }

    @MessagePattern('send-email')
    send(@Payload() data: Record<string, any>, @Ctx() context?: RmqContext) {
        const IsOK = this.sendEmailUseCase.execute(data)
        return ProcessResponse.setResponseRMQ(IsOK, (a) => (a), context)
    }

}
