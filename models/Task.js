const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  status: { type: String, enum: ["TODO", "DONE"], default: "TODO" },
  linkedFile: {
    data: Buffer,
    contentType: String,
    fileName: String,
  },
  createdOn: { type: Date, required: true, default: Date.now },
  deadline: { type: Date, required: true },
});

// Lets the table know a PDF exists without sending the buffer to the browser.
taskSchema.virtual("hasFile").get(function () {
  return Boolean(this.linkedFile && this.linkedFile.fileName);
});

taskSchema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("Task", taskSchema);