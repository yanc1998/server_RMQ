import {response, Response} from 'express';
import {Either} from '../Either';
import {AppError} from '../errors/AppError';
import {Result} from '../Result';
import {RmqContext} from "@nestjs/microservices";
import {RabbitMqService} from "../../../rabit-mq/Infra/services/rabbit-mq.service";
import {retry} from "rxjs";


export type ErrorsTypes<T> =
    AppError.UnexpectedErrorResult<T>
    | AppError.ValidationErrorResult<T>
    | AppError.ObjectNotExistResult<T>
    | AppError.TransactionalErrorResult<T>;

export class ProcessResponse {
    public static setResponse<T>(res: Response, data: Either<ErrorsTypes<T>, Result<T>>, funcMapper: (domain: T) => any) {

        if (!data.isLeft()) {
            const value = data.value.unwrap();
            return res.status(200).json(funcMapper(value));
        }

        const error = data.value.unwrapError();

        console.log(error)
        if (error.name === AppError.UnexpectedError.name) {
            return res.status(400).json({
                code: 400,
                message: error.message,
            });

        }

        if (error.name === AppError.ValidationError.name) {
            return res.status(401).json({
                code: 401,
                message: error.message,
            });

        }

        return res.status(400);
    }

    public static setResponseRMQ<T>(data: Either<ErrorsTypes<T>, Result<T>>, funcMapper: (domain: T) => any, context?: RmqContext, sendAck: boolean = false) {

        if (!data.isLeft()) {
            const value = data.value.unwrap();
            return {status: '200', value: funcMapper(value)};
        }

        const error = data.value.unwrapError();

        if (error.name === AppError.UnexpectedError.name) {
            return {
                code: 400,
                message: error.message,
            };
        }

        if (error.name === AppError.ValidationError.name) {
            return {
                code: 401,
                message: error.message,
            };
        }

        return {
            code: 400,
            message: 'bad request'
        }
    }
}
