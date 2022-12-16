import {IsString} from "class-validator";

export class SendEmailDto {
    @IsString()
    to: string

    attachments: Record<string, any>[]

    @IsString()
    template: string

    data: Record<string, any>
}
