var express = require("express");
var router = express.Router();
var multer = require("multer");
var userModel = require("../Modules/user");
var addModel = require("../Modules/staticAdd");
router.use(express.static(__dirname + "./public/"));
var path = require("path");
const mongoose = require("mongoose");

var Storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

var upload = multer({ storage: Storage }).single("profile");

router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/get/", function (req, res, next) {
  var perPage = 2;
  var page = req.params.page || 1;
  userModel
    .find({})
    .sort({ name: 1 })
    .skip(perPage * page - perPage)
    .limit(perPage)
    .select("state city country code mob_no address name email")
    .populate("addDetails", "city state code country")
    .exec(function (err, data) {
      if (err) throw err;
      userModel.countDocuments({}).exec((err, count) => {
        res.render("pagination", {
          record: data,
          text: "pagination task",
          current: page,
          pages: Math.ceil(count / perPage),
        });
      });
    });
  // .then((doc) => {
  //   res.render("pagination", {
  //     record: doc,
  //     text: "pagination task",
  //   });
  // })
  // .catch((err) => {
  //   res.json(err);
  // });
});
router.get("/get/:page", function (req, res, next) {
  var perPage = 2;
  var page = req.params.page || 1;
  userModel
    .find({})
    .sort({ name: 1 })
    .skip(perPage * page - perPage)
    .limit(perPage)
    .select("state city country code mob_no address name email")
    .populate("addDetails", "city state code country")
    .exec(function (err, data) {
      if (err) throw err;
      userModel.countDocuments({}).exec((err, count) => {
        res.render("pagination", {
          record: data,
          text: "pagination task",
          current: page,
          pages: Math.ceil(count / perPage),
        });
      });
    });
  // .then((doc) => {
  //   res.render("pagination", {
  //     record: doc,
  //     text: "pagination task",
  //   });
  // })
  // .catch((err) => {
  //   res.json(err);
  // });
});

router.post("/post", upload, function (req, res, next) {
  var userD = new userModel({
    addDetails: req.body.addDetails,
    name: req.body.name,
    mob_no: req.body.mob_no,
    address: req.body.address,
    email: req.body.email,
    // state: req.body.state,
    // code: req.body.code,
    // city: req.body.city,
    profile: req.file.filename,
    // country: req.body.country,
  });
  userD
    .save()
    .then((doc) => {
      res.status(200).json({
        message: "data stored successfully",
        data: doc,
      });
    })
    .catch((err) => res.json(err));
});
router.post("/admin", function (req, res, next) {
  var addD = new addModel({
    city: req.body.city,
    state: req.body.state,
    code: req.body.code,
    country: req.body.country,
  });
  addD
    .save()
    .then((doc) => {
      res.status(200).json({
        message: "data stored successfully",
        data: doc,
      });
    })
    .catch((err) => {
      res.json(err);
    });
});
router.get("/getadmin", function (req, res, next) {
  addModel
    .find({})
    .exec()
    .then((doc) => {
      res.status(200).json({
        message: "data",
        result: doc,
      });
    })
    .catch((err) => {
      res.json(err);
    });
});
module.exports = router;
