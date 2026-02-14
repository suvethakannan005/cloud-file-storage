const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  fileName: String,
  fileUrl: String
});

module.exports = mongoose.model("File", fileSchema);
