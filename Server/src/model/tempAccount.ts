import mongoose, { Schema, Document } from "mongoose";

interface TempAccount extends Document {
  firstName: string;
  lastName: string;
  birthDate: Date;
  idCard: string;
  email: string;
  username: string;
  password: string;
}

const TempAccountSchema = new Schema<TempAccount>({
  firstName: {
    type: String,
    unique: false,
  },
  lastName: {
    type: String,
    unique: false,
  },
  birthDate: {
    type: Date,
  },
  idCard: {
    type: String,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
  },
  username: {
    type: String,
  },
  password: {
    type: String,
  },
});

export default mongoose.model<TempAccount>("TempAccount", TempAccountSchema);
