import {Injectable} from "@nestjs/common";
import {RabbitMqService} from "../../../rabit-mq/Infra/services/rabbit-mq.service";
import {Either, right} from "../../../common/core/Either";
import {AppError} from "../../../common/core/errors/AppError";
import {Result} from "../../../common/core/Result";

export type SendEmailUseCaseResponse = Either<AppError.UnexpectedErrorResult<string>,
    Result<string>>;

@Injectable()
export class SendEmailUseCase {
    constructor(private readonly rabbitMqService: RabbitMqService) {
    }

    execute(data: any): SendEmailUseCaseResponse {
        return right(Result.Ok("OK"))
    }

}
