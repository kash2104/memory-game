const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = async (req, res, next) => {
  try {
    //authenticating the user by token present inside the cookies
    const token =
      req.cookies.token ||
      req.body.token ||
      req.header("Authorization").replace("Bearer ", "");

    //token is not present
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token is missing. Please login again",
      });
    }

    //verify the token
    try {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

      //add the contents of the token(email, highestScore, allScores) in req.user
      req.user = decodedToken;
    } catch (error) {
      return res.status(401).json({
        //token has expired after 24 hours
        success: false,
        message: "Token is invalid.",
      });
    }

    //go to the next middleware
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Error while validating the token",
    });
  }
};
