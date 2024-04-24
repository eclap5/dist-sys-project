import mongoose, { Document, Schema } from "mongoose";

interface IReservation extends Document {
  _id: string;
  user: string;
  title: string;
  description: string;
  startDateTime: Date;
  endDateTime: Date;
}

let reservationSchema: Schema = new Schema({
  user: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  startDateTime: { type: Date, required: true },
  endDateTime: { type: Date, required: true },
});

const Reservation: mongoose.Model<IReservation> = mongoose.model<IReservation>(
  "Reservation",
  reservationSchema
);

export { Reservation, IReservation };
