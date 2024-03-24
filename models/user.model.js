const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
    },

    username: {
      type: String,
    },

    password: {
      type: String,
    },

    // 0: user 1: admin
    role: {
      type: Number,
      default: 0,
    },

    favourite: [{ type: mongoose.Schema.Types.ObjectId, ref: "film" }],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("user", userSchema);
