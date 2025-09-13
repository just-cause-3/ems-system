const mongoose = require("mongoose");
const autoIncrement = require("mongoose-auto-increment");

const LeaveApplicationSchema = new mongoose.Schema({
  Leavetype: { type: String, required: true },
  FromDate: { type: Date, required: true },
  ToDate: { type: Date, required: true },
  Reasonforleave: { type: String, required: true },
  Status: { type: String, default: "Pending" },
  employee: { type: mongoose.Schema.Types.ObjectId, ref: "Employee", required: true }
});

autoIncrement.initialize(mongoose.connection);
LeaveApplicationSchema.plugin(autoIncrement.plugin, "LeaveApplication");

module.exports = mongoose.model("LeaveApplication", LeaveApplicationSchema);
