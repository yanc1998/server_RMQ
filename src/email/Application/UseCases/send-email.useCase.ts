import {Injectable, Logger} from "@nestjs/common";
import {Either, left, right} from "../../../common/core/Either";
import {AppError} from "../../../common/core/errors/AppError";
import {Result} from "../../../common/core/Result";
import {MailerService} from "@nestjs-modules/mailer";
import {SendEmailDto} from "../DTO/send-email.dto";

export type SendEmailUseCaseResponse = Either<AppError.UnexpectedErrorResult<string>,
    Result<string>>;

@Injectable()
export class SendEmailUseCase {
    private _logger: Logger;

    constructor(private readonly mailerService: MailerService) {
        this._logger = new Logger('SendEmailUseCase');
    }

    async execute(data: SendEmailDto): Promise<SendEmailUseCaseResponse> {
        try {
            await this.mailerService.sendMail({
                to: data.to,
                template: data.template,
                context: data.data,
                //attachments: data.attachments as any
            })
            return right(Result.Ok("OK"))
        } catch (error) {
            return left(Result.Fail(new AppError.UnexpectedError(error)))
        }
    }
}
