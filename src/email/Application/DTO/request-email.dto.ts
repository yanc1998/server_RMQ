import {SendEmailDto} from "./send-email.dto";

export class RequestEmailDto {
    data: SendEmailDto
    options: Record<string, any>
}
