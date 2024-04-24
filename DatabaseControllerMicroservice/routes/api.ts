import express, { Router, Response, Request } from "express";
import mongoose from "mongoose";
import { Reservation, IReservation } from "../models/Reservation";
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
        .status(404)
        .send({ message: "Missing fields" });
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
    res.status(200).send({ message: "Reservation created" });
  } catch (error: any) {
    res.status(500).send({ message: error });
  }
});

router.get("/reservations", async (req: Request, res: Response) => {
  try {
    await mongoose.connect(mongoDB);
    const reservations: IReservation[] = await Reservation.find();
    mongoose.connection.close();
    res.status(200).send({ reservations: reservations });
  } catch (error: any) {
    console.error(`Error during user registration: ${error}`)
    return res.status(500).json({ error: 'Internal Server Error' })
  }
});

export default router;
