import mongoose, { Schema, Document } from "mongoose";

interface IVehicle extends Document {
  name: string;
  status: string;
  updatedAt: Date;
}

const VehicleSchema: Schema = new Schema({
  name: { type: String, required: true },
  status: { type: String, required: true },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.model<IVehicle>("Vehicle", VehicleSchema);
