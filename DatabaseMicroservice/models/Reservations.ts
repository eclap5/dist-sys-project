import mongoose, { Document, Schema } from "mongoose";

interface IReservation extends Document {
  _id: string;
  user: string;
  title: string;
  description: string;
  startDateTime: string;
  endDateTime: string;
}

let reservationSchema: Schema = new Schema({
  _id: { type: String, required: true },
  user: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  startDateTime: { type: String, required: true },
  endDateTime: { type: String, required: true },
});

const Reservation: mongoose.Model<IReservation> = mongoose.model<IReservation>(
  "Reservation",
  reservationSchema
);

export { Reservation, IReservation };
