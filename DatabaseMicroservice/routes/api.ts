import express, { Router, Response, Request } from "express";
import mongoose from "mongoose";
import { Reservation, IReservation } from "../models/Reservations";
import dotenv from "dotenv";

dotenv.config();
const router: Router = express.Router();
const mongoDB: string = process.env.MONGO_DB_CONNECTION_STRING || "";

router.post("/reservations", async (req: Request, res: Response) => {
  try {
    if (!req.body.email || !req.body.username || !req.body.message) {
      return res
        .status(400)
        .send({ status: "error", message: "Missing fields" });
    }
    await mongoose.connect(mongoDB);
    await Reservation.create({
      user: req.body.user,
      title: req.body.title,
      description: req.body.description,
      startDateTime: req.body.startDateTime,
      endDateTime: req.body.endDateTime,
    });
    mongoose.connection.close();
    res.send({ status: "success", message: "Reservation created" });
  } catch (error) {
    res.send({ status: "error", message: error });
  }
});

router.get("/reservations", async (req: Request, res: Response) => {
  try {
    await mongoose.connect(mongoDB);
    if (!req.body.startDateTime || !req.body.endDateTime) {
      return res
        .status(400)
        .send({ status: "error", message: "Missing fields" });
    }
    const reservations: IReservation[] = await Reservation.find(
      {
        startDateTime: { $gte: req.body.startDateTime },
        endDateTime: { $lte: req.body.endDateTime },
      },
      { _id: 0, __v: 0 }
    );
    mongoose.connection.close();
    res.send({ status: "success", reservations: reservations });
  } catch (error) {
    res.send({ status: "error", message: error });
  }
});

export default router;
