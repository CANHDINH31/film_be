const filmModel = require("../models/film.model");

module.exports = {
  create: async (req, res) => {
    try {
      const data = await filmModel.create(req.body);
      return res.status(201).json(data);
    } catch (error) {
      throw error;
    }
  },

  list: async (req, res) => {
    try {
      let data = await filmModel.find({}).sort({ createdAt: -1 });
      return res.status(200).json(data);
    } catch (error) {
      throw error;
    }
  },

  update: async (req, res) => {
    try {
      const data = await filmModel.findByIdAndUpdate(
        req.params.id,
        {
          ...req.body,
        },
        { new: true }
      );
      res.status(201).json(data);
    } catch (error) {
      throw error;
    }
  },

  findOne: async (req, res) => {
    try {
      let data = await filmModel.findById(req.params.id);
      return res.status(200).json(data);
    } catch (error) {
      throw error;
    }
  },

  deleteData: async (req, res) => {
    try {
      await filmModel.findOneAndDelete({ _id: req.params.id });
      res.status(201).json("Xóa film thành công");
    } catch (error) {
      throw error;
    }
  },
};
