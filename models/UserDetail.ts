import { Schema, model, models } from "mongoose";

const userDetailSchema = new Schema(
  {
    user_id: { type: Schema.Types.ObjectId, ref: "users", required: true },
    nama: { type: String, required: true },
    jurusan: { type: String, required: true },
    kelas: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const UserDetail = models.UserDetail || model("UserDetail", userDetailSchema);
export default UserDetail;
