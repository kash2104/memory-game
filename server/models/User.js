const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  highestScore: {
    type: Number,
    default: 0,
  },
  scores: [
    {
      type: Number,
    },
  ],
  token: {
    type: String,
  },
});

module.exports = mongoose.model("User", userSchema);
