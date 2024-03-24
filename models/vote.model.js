const mongoose = require("mongoose");

const voteSchema = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    film: { type: mongoose.Schema.Types.ObjectId, ref: "film" },
    score: { type: Number },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("vote", voteSchema);
