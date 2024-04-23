"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendNotification = void 0;
const config_1 = require("./config");
const connection_1 = __importDefault(require("./connection"));
const sendNotification = async (notification) => {
    await connection_1.default.sendToQueue(config_1.NOTIFICATION_QUEUE, notification);
    console.log(`Sent the notification to consumer`);
};
exports.sendNotification = sendNotification;
