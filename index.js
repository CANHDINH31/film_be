const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./configs/database");
const router = require("./routers");

app.use(express.json());
app.use(cors());

connectDB();
app.use("/uploads", express.static("uploads"));
router(app);

app.listen(process.env.PORT || 8000, () => {
  console.log("Server run at port 8000");
});
