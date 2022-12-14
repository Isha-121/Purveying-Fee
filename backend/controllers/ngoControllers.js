const Food = require("../models/food_db");
const Edu = require("../models/education_db");
const Loc = require("../models/location_db");
const Ngo = require("../models/ngo_db");
const bcrypt = require("bcrypt");

exports.registerfunc = async (req, res) => {
  const saltPassword = await bcrypt.genSalt(12);
  const securePassword = await bcrypt.hash(req.body.password, saltPassword);
  const secureconfirm = await bcrypt.hash(
    req.body.confirmPassword,
    saltPassword
  );

  if (securePassword === secureconfirm) {
    req.body.password = securePassword;
    req.body.confirmPassword = secureconfirm;

    Ngo.create(req.body, (err, ngo) => {
      if (err) {
        return res.status(500).json({
          data: {},
          success: false,
          error: "Email is already registered.",
        });
      }
      return res.status(200).json({
        data: ngo,
        success: true,
        error: "",
      });
    });
  } else {
    return res.json({
      data: {},
      success: false,
      error: "Passwords are not same",
    });
  }
};

exports.loginfunc = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const ngo = await Ngo.findOne({ email: email });
    const isMatch = await bcrypt.compare(password, ngo.password);
    if (isMatch) {
      ngo.password = null;
      ngo.confirmPassword = null;
      return res.json({
        success: true,
        data: ngo,
        error: "",
      });
    } else {
      return res.json({
        success: false,
        error: "Invalid Login Credentials!",
        data: {},
      });
    }
  } catch (error) {
    return res.status(404).send({
      data: {},
      success: false,
      error: "Internal server error",
    });
  }
};

exports.createClass = (req, res) => {
  // console.log(req.body);
  Edu.create(req.body, function (err, data) {
    if (err) {
      console.log(err);
      return res.json({
        data: {},
        success: false,
        error: "Error in creating class",
      });
    }

    return res.json({
      data: data,
      success: true,
      error: "",
    });
  });
};

exports.createOutlet = (req, res) => {
  // console.log(req.body);
  Food.create(req.body, function (err, data) {
    if (err) {
      // console.log(err);
      return res.json({
        data: {},
        success: false,
        error: "Error in creating outlet",
      });
    }

    return res.json({
      data: data,
      success: true,
      error: "",
    });
  });
};

exports.searchClass = (req, res) => {
  // console.log(req.query);

  const queryObj = { ...req.query };
  const excludeFields = ["page", "sort", "limit", "fields"];
  excludeFields.forEach((eF) => delete queryObj[eF]);
  Edu.find(queryObj).exec((err, data) => {
    if (err) {
      // console.log(err);
      return res.json({
        data: {},
        success: false,
        error: "Internal Server Error",
      });
    }

    return res.json({
      data: data,
      success: true,
      error: "",
    });
  });
};

exports.searchLocations = (req, res) => {
  // console.log(req.query);
  Loc.find().exec((err, data) => {
    if (err) {
      // console.log(err);
      return res.json({
        data: {},
        success: false,
        error: "Internal Server Error",
      });
    }
    return res.json({
      data: data,
      success: true,
      error: "",
    });
  });
};

exports.searchOutlet = (req, res) => {
  // console.log(req.query);

  const queryObj = { ...req.query };
  const excludeFields = ["page", "sort", "limit", "fields"];
  excludeFields.forEach((eF) => delete queryObj[eF]);
  Food.find(queryObj).exec((err, data) => {
    if (err) {
      // console.log(err);
      return res.json({
        data: {},
        success: false,
        error: "Internal Server Error",
      });
    }

    return res.json({
      data: data,
      success: true,
      error: "",
    });
  });
};
