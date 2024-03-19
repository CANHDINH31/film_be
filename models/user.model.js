const mongoose = require("mongoose");

const categorySchema = mongoose.Schema(
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
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("category", categorySchema);
