"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const amqplib_1 = __importDefault(require("amqplib"));
const config_1 = require("./config");
class RabbitMQConnection {
    connection;
    channel;
    connected;
    async connect() {
        if (this.connected && this.channel)
            return;
        else
            this.connected = true;
        try {
            console.log(`⌛️ Connecting to Rabbit-MQ Server`);
            this.connection = await amqplib_1.default.connect(`amqp://${config_1.rmqUser}:${config_1.rmqPass}@${config_1.rmqhost}:5672`);
            console.log(`✅ Rabbit MQ Connection is ready`);
            this.channel = await this.connection.createChannel();
            console.log(`🛸 Created RabbitMQ Channel successfully`);
        }
        catch (error) {
            console.error(error);
            console.error(`Not connected to MQ Server`);
        }
    }
    async sendToQueue(queue, message) {
        try {
            if (!this.channel) {
                await this.connect();
            }
            this.channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    }
}
const mqConnection = new RabbitMQConnection();
exports.default = mqConnection;
