const mongoose = require("mongoose");

const scoreSchema = new mongoose.Schema({
  highestScore: {
    type: Number,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Score", scoreSchema);
