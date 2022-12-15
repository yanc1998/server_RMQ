import {Inject, Injectable} from "@nestjs/common";
import {Ctx, RmqContext} from "@nestjs/microservices"

export class RabbitMqService {

    static getMessage(context?: RmqContext): Record<string, any> {
        return context.getMessage()
    }

    static sendAck(_ack: string, context?: RmqContext): void {
        const channel = context.getChannelRef()
        const message = context.getMessage()
        channel.ack({
            ...message, _ack
        })
    }

}
