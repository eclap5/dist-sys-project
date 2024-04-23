"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongoDB = "mongodb+srv://headmaster:Huora123@reservations-db.mongocluster.cosmos.azure.com/?tls=true&authMechanism=SCRAM-SHA-256&retrywrites=false&maxIdleTimeMS=120000";
mongoose_1.default.connect(mongoDB);
mongoose_1.default.Promise = global.Promise;
const db = mongoose_1.default.connection;
exports.db = db;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
