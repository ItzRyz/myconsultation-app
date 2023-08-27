import { Schema, model, models } from "mongoose";

const toDoSchema = new Schema({
  title: { type: String, required: false },
  note: { type: String, required: false },
});

const problemSchema = new Schema({
  title: { type: String, required: false },
  note: { type: String, required: false },
});

const journalSchema = new Schema(
  {
    user_id: { type: Schema.Types.ObjectId, ref: "users", required: true },
    konselor_id: {
      type: Schema.Types.ObjectId,
      ref: "konselors",
      required: true,
    },
    mood: { type: String, required: false },
    to_do_list: [toDoSchema],
    journal_field: { type: String, required: false },
    problem_list: [problemSchema],
  },
  {
    timestamps: true,
  }
);

const Journal = models.Journal || model("Journal", journalSchema);
export default Journal;
