const express = require("express");

const router = express.Router();

const {
  create,
  list,
  update,
  findOne,
  deleteData,
  recommend,
  upload,
} = require("../controllers/film.controller");

const asyncMiddelware = require("../middlewares/asyncHandle");

router.route("/upload").post(asyncMiddelware(upload));
router.route("/").post(asyncMiddelware(create));
router.route("/:id").delete(asyncMiddelware(deleteData));
router.route("/:id").put(asyncMiddelware(update));
router.route("/recommend/:id").get(asyncMiddelware(recommend));
router.route("/:id").get(asyncMiddelware(findOne));
router.route("/").get(asyncMiddelware(list));

module.exports = router;
