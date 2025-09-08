import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    shortDesc: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    banner: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    postedBy: {
      type: String,
      required: true,
    },
    link: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Event = mongoose.models.Event || mongoose.model("Event", eventSchema);

export default Event;
