const mongoose = require("mongoose");

const filmSchema = mongoose.Schema(
  {
    title: {
      type: String,
    },

    description: {
      type: String,
    },

    // 1: Tâm lý tình cảm, 2: Hành động, 3: Hoạt hình, 4....
    category: {
      type: [Number],
    },

    // 1. Việt Nam, 2.Hồng Kông, 3.Hàn Quốc, 4......
    country: {
      type: Number,
    },

    // Mỗi url tương ứng với 1 tập
    url: {
      type: [String],
    },

    isNew: {
      type: Number,
      default: 0,
    },

    isNominate: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("film", filmSchema);
