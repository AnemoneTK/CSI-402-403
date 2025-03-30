import mongoose, { Schema, Document, Types } from "mongoose";
import tempAccount from "./tempAccount";
interface History extends Document {
  userId: Types.ObjectId;
  token: string;
}

const History = new Schema<History>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: tempAccount,
      required: true,
    },
    token: {
      type: String,
      unique: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model<History>("History", History);
