import { Schema, model, models } from "mongoose";

const adminSchema = new Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Admin = models.Admin || model("Admin", adminSchema);
export default Admin;
