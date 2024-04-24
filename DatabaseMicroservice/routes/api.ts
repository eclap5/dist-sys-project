import express, { Router, Response, Request } from "express";
import mongoose from "mongoose";
import { Reservation, IReservation } from "../models/Reservations";
import dotenv from "dotenv";

dotenv.config();
const router: Router = express.Router();
const mongoDB: string = process.env.MONGO_DB_CONNECTION_STRING || "";

// ALL TIME STAMPS ARE ON ZULUTIME IN DB
router.post("/reservations", async (req: Request, res: Response) => {
  try {
    if (
      !req.body.user ||
      !req.body.title ||
      !req.body.description ||
      !req.body.startDateTime ||
      !req.body.endDateTime
    ) {
      return res
        .status(400)
        .send({ status: "error", message: "Missing fields" });
    }
    let startDateTime: Date = new Date(req.body.startDateTime);
    let endDateTime: Date = new Date(req.body.endDateTime);
    await mongoose.connect(mongoDB);
    await Reservation.create({
      user: req.body.user,
      title: req.body.title,
      description: req.body.description,
      startDateTime: startDateTime,
      endDateTime: endDateTime,
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

    let startDateTime: Date = new Date(req.body.startDateTime);
    let endDateTime: Date = new Date(req.body.endDateTime);

    const reservations: IReservation[] = await Reservation.find(
      {
        startDateTime: { $gte: startDateTime },
        endDateTime: { $lte: endDateTime },
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
