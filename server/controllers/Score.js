const User = require("../models/User");

exports.getHighestScore = async (req, res) => {
  try {
    const { email } = req.user;

    const user = await User.findOne({ email: email });

    const highestScore = user.highestScore;

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
    const { email } = req.user;

    const user = await User.findOne({ email: email });

    const allScores = user.scores;

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

exports.updateScores = async (req, res) => {
  try {
    const { turns } = req.body;

    const { email } = req.user;

    const user = await User.findOne({ email: email });

    if (turns < user.highestScore || !user.highestScore) {
      user.highestScore = turns;
    }

    user.scores.unshift(turns);

    await user.save();

    res.status(200).json({
      success: true,
      message: "Scores updated successfully",
      data: {
        highestScore: user.highestScore,
        allScores: user.scores,
      },
    });
  } catch (error) {
    console.log("Error while getting updating scores", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update the scores",
      error: error.message,
    });
  }
};
