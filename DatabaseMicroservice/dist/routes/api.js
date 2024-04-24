"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const Reservations_1 = require("../models/Reservations");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const router = express_1.default.Router();
const mongoDB = process.env.MONGO_DB_CONNECTION_STRING || "";
router.post("/reservations", async (req, res) => {
    try {
        if (!req.body.email || !req.body.username || !req.body.message) {
            return res
                .status(400)
                .send({ status: "error", message: "Missing fields" });
        }
        await mongoose_1.default.connect(mongoDB);
        await Reservations_1.Reservation.create({
            email: req.body.email,
            username: req.body.username,
            message: req.body.message,
        });
        mongoose_1.default.connection.close();
        res.send({ status: "success", message: "Reservation created" });
    }
    catch (error) {
        res.send({ status: "error", message: error });
    }
});
router.get("/reservations", async (req, res) => {
    try {
        await mongoose_1.default.connect(mongoDB);
        const reservations = await Reservations_1.Reservation.find();
        mongoose_1.default.connection.close();
        res.send({ status: "success", reservations: reservations });
    }
    catch (error) {
        res.send({ status: "error", message: error });
    }
});
exports.default = router;
