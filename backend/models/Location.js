import mongoose from "mongoose";

const LocationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    photoUrl: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Location", LocationSchema);
