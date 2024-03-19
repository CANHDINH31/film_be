const userRouter = require("./user.router");

const errorHandle = require("../middlewares/errorHandle");

module.exports = (app) => {
  app.use("/api/users", userRouter);
  app.use(errorHandle);
};
