const commentModel = require("../models/comment.model");

module.exports = {
  create: async (req, res) => {
    try {
      const data = await commentModel.create(req.body);
      return res.status(201).json(data);
    } catch (error) {
      throw error;
    }
  },

  list: async (req, res) => {
    try {
      let query = {};

      query = {
        ...(req?.query?.user && {
          user: req.query.user,
        }),
        ...(req?.query?.film && {
          film: req.query.film,
        }),
      };

      let data = await commentModel
        .find(query)
        .sort({ createdAt: -1 })
        .populate("user")
        .populate("film");
      return res.status(200).json(data);
    } catch (error) {
      throw error;
    }
  },

  update: async (req, res) => {
    try {
      const data = await commentModel.findByIdAndUpdate(
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
      let data = await commentModel
        .findById(req.params.id)
        .populate("user")
        .populate("film");
      return res.status(200).json(data);
    } catch (error) {
      throw error;
    }
  },

  deleteData: async (req, res) => {
    try {
      await commentModel.findOneAndDelete({ _id: req.params.id });
      res.status(201).json("Xóa comment thành công");
    } catch (error) {
      throw error;
    }
  },
};
