import mongoose from "mongoose";

const TicketSchema = new mongoose.Schema(
  {
    issue: { type: String, required: true },
    name: { type: String, default: "" },
    email: { type: String, default: "" },
    semester: { type: String, default: "" },
    ip: { type: String, default: "", required: true },
    anonymous: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Ticket = mongoose.models.Ticket || mongoose.model("Ticket", TicketSchema);
export default Ticket;
