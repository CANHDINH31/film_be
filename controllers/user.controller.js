const userModel = require("../models/user.model");

module.exports = {
  signIn: async (req, res) => {
    try {
      let { ...body } = req.body;
      let user = await userModel
        .findOne({
          username: body.username,
          password: body.password,
        })
        .select("-password");

      if (!user) {
        return res.status(200).json({
          status: 400,
          message: "Username hoặc mật khẩu không chính xác",
        });
      }
      return res.status(200).json(user);
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  signUp: async (req, res) => {
    try {
      let { ...body } = req.body;

      const existUsername = await userModel.findOne({
        username: body.username,
      });

      if (existUsername) {
        return res.status(200).json({
          status: 400,
          message: "Username đã tồn tại",
        });
      }

      const data = await userModel.create(body);
      res.status(201).json(data);
    } catch (error) {
      throw error;
    }
  },

  list: async (req, res) => {
    try {
      let data = await userModel
        .find({})
        .select(["-updatedAt", "-createdAt"])
        .sort({ createdAt: -1 });
      return res.status(200).json(data);
    } catch (error) {
      throw error;
    }
  },

  findOne: async (req, res) => {
    try {
      let data = await userModel
        .findById(req.params.id)
        .select(["-updatedAt", "-createdAt"]);
      return res.status(200).json(data);
    } catch (error) {
      throw error;
    }
  },

  update: async (req, res) => {
    try {
      const data = await userModel.findByIdAndUpdate(
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

  deleteData: async (req, res) => {
    try {
      await userModel.findOneAndDelete({ _id: req.params.id });
      res.status(201).json("Xóa user thành công");
    } catch (error) {
      throw error;
    }
  },
};
