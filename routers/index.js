const userRouter = require("./user.router");
const filmRouter = require("./film.router");
const voteRouter = require("./vote.router");

const errorHandle = require("../middlewares/errorHandle");

module.exports = (app) => {
  app.use("/api/users", userRouter);
  app.use("/api/films", filmRouter);
  app.use("/api/votes", voteRouter);

  app.use(errorHandle);
};
