const express = require("express");
const router = express.Router();

const {
  signIn,
  signUp,
  list,
  findOne,
  update,
  deleteData,
} = require("../controllers/user.controller");

const asyncMiddelware = require("../middlewares/asyncHandle");

router.route("/sign-in").post(asyncMiddelware(signIn));
router.route("/sign-up").post(asyncMiddelware(signUp));
router.route("/:id").delete(asyncMiddelware(deleteData));
router.route("/:id").put(asyncMiddelware(update));
router.route("/:id").get(asyncMiddelware(findOne));
router.route("/").get(asyncMiddelware(list));

module.exports = router;
