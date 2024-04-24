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
// ALL TIME STAMPS ARE ON ZULUTIME IN DB
router.post("/reservations", async (req, res) => {
    try {
        if (!req.body.user ||
            !req.body.title ||
            !req.body.description ||
            !req.body.startDateTime ||
            !req.body.endDateTime) {
            return res
                .status(400)
                .send({ status: "error", message: "Missing fields" });
        }
        let startDateTime = new Date(req.body.startDateTime);
        let endDateTime = new Date(req.body.endDateTime);
        await mongoose_1.default.connect(mongoDB);
        await Reservations_1.Reservation.create({
            user: req.body.user,
            title: req.body.title,
            description: req.body.description,
            startDateTime: startDateTime,
            endDateTime: endDateTime,
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
        if (!req.body.startDateTime || !req.body.endDateTime) {
            return res
                .status(400)
                .send({ status: "error", message: "Missing fields" });
        }
        let startDateTime = new Date(req.body.startDateTime);
        let endDateTime = new Date(req.body.endDateTime);
        const reservations = await Reservations_1.Reservation.find({
            startDateTime: { $gte: startDateTime },
            endDateTime: { $lte: endDateTime },
        }, { _id: 0, __v: 0 });
        mongoose_1.default.connection.close();
        res.send({ status: "success", reservations: reservations });
    }
    catch (error) {
        res.send({ status: "error", message: error });
    }
});
exports.default = router;
