import {Module} from '@nestjs/common';
import {EmailController} from "./Presentation/email-controller";
import {SendEmailUseCase} from "./Application/UseCases/send-email.useCase";
import {AppConfigModule} from "../common/modules/config/app-config.module";
import {AppConfigService} from "../common/modules/config/service/app-config-service";
import {MailerModule} from "@nestjs-modules/mailer";
import {PugAdapter} from "@nestjs-modules/mailer/dist/adapters/pug.adapter";
import {HandlebarsAdapter} from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter";

@Module({
    controllers: [EmailController],
    imports: [
        MailerModule.forRootAsync({
            imports: [AppConfigModule],
            inject: [AppConfigService],
            useFactory: (appConfig: AppConfigService) => ({
                transport: {
                    host: appConfig.smtp.host,
                    secure: true,
                    auth: {
                        user: appConfig.smtp.email,
                        pass: appConfig.smtp.password,
                    },
                }, defaults: {
                    from: `"nest-modules" <${'username@gmail.com'}>`,
                }, template: {
                    dir: process.cwd() + '/templates/',
                    adapter: new HandlebarsAdapter(),
                    options: {
                        strict: true,
                    },
                }
            }),
        }),],
    providers: [SendEmailUseCase]
})
export class EmailModule {
}
