const express = require("express");
const router = express.Router();

const {
  getHighestScore,
  getAllScores,
  updateScores,
  getLeaderboard,
} = require("../controllers/Score");

const { auth } = require("../middlewares/auth");

router.get("/getHighestScore", auth, getHighestScore);
router.get("/getAllScores", auth, getAllScores);
router.post("/updateScore", auth, updateScores);
router.get("/getLeaderboard", getLeaderboard);

module.exports = router;
