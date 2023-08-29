import { Schema, model, models } from "mongoose";

const konselorSchema = new Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Konselor = models.Konselor || model("Konselor", konselorSchema);
export default Konselor;
