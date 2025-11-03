import mongoose from "mongoose";

const tipSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required!"],
  },
  description: {
    type: String,
    required: [true, "Description is required!"],
  },
  category: {
    type: String,
    required: [true, "Category is required!"],
  },
  tipImage: {
    public_id: {
      type: String,
    },
    url: {
      type: String,
    },
  },
});

export const Tip = mongoose.model("Tip", tipSchema);
