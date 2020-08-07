const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/user", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
var addSchema = mongoose.Schema({
  city: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  code: {
    type: Number,
    required: true,
  },
});
var addModel = mongoose.model("staticAdd", addSchema);
module.exports = addModel;
