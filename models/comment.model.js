const mongoose = require("mongoose");

const commentSchema = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    film: { type: mongoose.Schema.Types.ObjectId, ref: "film" },
    content: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("comment", commentSchema);
