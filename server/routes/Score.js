const express = require("express");
const router = express.Router();

const { getHighestScore, getAllScores } = require("../controllers/Score");

const { auth } = require("../middlewares/auth");

router.get("/getHighestScore", auth, getHighestScore);
router.get("/getAllScores", auth, getAllScores);

module.exports = router;
