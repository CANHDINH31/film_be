const voteModel = require("../models/vote.model");

module.exports = {
  create: async (req, res) => {
    try {
      const data = await voteModel.create(req.body);
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

      let data = await voteModel
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
      const data = await voteModel.findByIdAndUpdate(
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
      let data = await voteModel
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
      await voteModel.findOneAndDelete({ _id: req.params.id });
      res.status(201).json("Xóa film thành công");
    } catch (error) {
      throw error;
    }
  },
};
