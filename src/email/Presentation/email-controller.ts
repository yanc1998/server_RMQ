import {Ctx, MessagePattern, Payload, RmqContext} from "@nestjs/microservices";
import {Controller} from "@nestjs/common";
import {SendEmailUseCase} from "../Application/UseCases/send-email.useCase";
import {ProcessResponse} from "../../common/core/utils/processResponse";
import {RequestEmailDto} from "../Application/DTO/request-email.dto";

@Controller()
export class EmailController {

    constructor(private readonly sendEmailUseCase: SendEmailUseCase) {
    }

    @MessagePattern('send-email')
    async send(@Payload() data: RequestEmailDto, @Ctx() context?: RmqContext) {
        const result = await this.sendEmailUseCase.execute(data.data)
        return ProcessResponse.setResponseRMQ(result, (a) => (a), context)
    }

}
