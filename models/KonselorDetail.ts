import { Schema, model, models } from "mongoose";

const konselorDetailSchema = new Schema(
  {
    konselor_id: {
      type: Schema.Types.ObjectId,
      ref: "konselors",
      required: true,
    },
    nama: { type: String, required: true },
    keahlian: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const KonselorDetail =
  models.KonselorDetail || model("KonselorDetail", konselorDetailSchema);
export default KonselorDetail;
