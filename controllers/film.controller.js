const filmModel = require("../models/film.model");
const voteModel = require("../models/vote.model");
const commentModel = require("../models/comment.model");

const multer = require("multer");
const util = require("util");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const uploadManyFiles = multer({ storage: storage }).array("files", 17);

const multipleUploadMiddleware = util.promisify(uploadManyFiles);

module.exports = {
  create: async (req, res) => {
    try {
      await multipleUploadMiddleware(req, res);
      const url = req.files?.map((e) => `http://localhost:8000/${e.path}`);
      const data = await filmModel.create({
        title: req.body?.title,
        description: req.body?.description,
        poster: req.body?.poster,
        url,
        category: req.body?.category?.split(",")?.map((e) => Number(e)),
        country: Number(req.body?.country),
      });
      return res.status(201).json(data);
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  list: async (req, res) => {
    try {
      let query = {};

      query = {
        ...(req?.query?.isNew && {
          isNew: req.query.isNew,
        }),
        ...(req?.query?.isNominate && {
          isNominate: req.query.isNominate,
        }),
        ...(req?.query?.listCountry && {
          country: { $in: req.query.listCountry?.split(",") },
        }),
        ...(req?.query?.listCategory && {
          category: { $in: req.query.listCategory?.split(",") },
        }),
        ...(req?.query?.title && {
          title: { $regex: req.query.title, $options: "i" },
        }),
      };

      let data = await filmModel.find(query).sort({ createdAt: -1 });
      const listResult = [];
      for (const film of data) {
        const numberVote = await voteModel.countDocuments({ film: film._id });
        const res = await voteModel.aggregate([
          { $match: { film: film._id } },
          {
            $group: {
              _id: "score",
              score: { $sum: "$score" },
            },
          },
          {
            $project: {
              totalScore: "$score",
            },
          },
        ]);

        listResult.push({
          ...film.toObject(),
          numberVote,
          totalScore: res?.[0]?.totalScore,
        });
      }
      return res.status(200).json(listResult);
    } catch (error) {
      console.log(error);
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

  recommend: async (req, res) => {
    try {
      const data = await filmModel.findById(req.params.id);
      const listCategory = data?.category;
      const listData = await filmModel.find({
        category: { $in: listCategory },
      });
      const listResult = [];
      for (const film of listData) {
        const numberVote = await voteModel.countDocuments({ film: film._id });
        const res = await voteModel.aggregate([
          { $match: { film: film._id } },
          {
            $group: {
              _id: "score",
              score: { $sum: "$score" },
            },
          },
          {
            $project: {
              totalScore: "$score",
            },
          },
        ]);

        listResult.push({
          ...film.toObject(),
          numberVote,
          totalScore: res?.[0]?.totalScore,
        });
      }
      return res.status(200).json(listResult);
    } catch (error) {
      throw error;
    }
  },

  findOne: async (req, res) => {
    try {
      let data = await filmModel.findById(req.params.id);
      const numberVote = await voteModel.countDocuments({
        film: req.params.id,
      });

      const score = await voteModel.aggregate([
        { $match: { film: data._id } },
        {
          $group: {
            _id: "score",
            score: { $sum: "$score" },
          },
        },
        {
          $project: {
            totalScore: "$score",
          },
        },
      ]);

      return res.status(200).json({
        ...data?.toObject(),
        numberVote,
        totalScore: score?.[0]?.totalScore,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  deleteData: async (req, res) => {
    try {
      await filmModel.findOneAndDelete({ _id: req.params.id });
      await commentModel.findOneAndDelete({ film: req.params.id });
      await voteModel.findOneAndDelete({ film: req.params.id });
      res.status(201).json("Xóa film thành công");
    } catch (error) {
      throw error;
    }
  },
};
