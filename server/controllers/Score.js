const User = require("../models/User");

exports.getHighestScore = async (req, res) => {
  try {
    const { highestScore } = req.user;

    res.status(200).json({
      success: true,
      data: highestScore,
    });
  } catch (error) {
    console.log("Error while getting the highest score", error);

    return res.status(500).json({
      success: false,
      message: "Failed to retrieve the highest score",
      error: error.message,
    });
  }
};

exports.getAllScores = async (req, res) => {
  try {
    const { allScores } = req.user;

    res.status(200).json({
      success: true,
      data: allScores,
    });
  } catch (error) {
    console.log("Error while getting all scores", error);

    return res.status(500).json({
      success: false,
      message: "Failed to retrieve all scores",
      error: error.message,
    });
  }
};
