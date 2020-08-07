const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/user", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
var conn = mongoose.Collection;
var userSchema = mongoose.Schema({
  addDetails: {
    type: String,
    ref: "staticAdd",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  mob_no: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
    match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  },

  address: {
    type: String,
    required: true,
  },

  date: {
    type: Date,
    default: Date.now(),
  },
  profile: {
    type: String,
    required: true,
  },
});
var userModel = mongoose.model("user", userSchema);
module.exports = userModel;
