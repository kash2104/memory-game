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
      type: mongoose.Schema.Types.ObjectId,
      ref: "Score",
    },
  ],
  token: {
    type: String,
  },
});

module.exports = mongoose.model("User", userSchema);
