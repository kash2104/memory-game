const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

//signup
exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    //field check
    if (!name || !email || !password) {
      return res.status(403).json({
        success: false,
        message: "All fields are required",
      });
    }

    //check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    //hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    //create the user
    const user = await User.create({
      name: name,
      email: email,
      password: hashedPassword,
    });

    //success res
    return res.status(200).json({
      success: true,
      message: "User is registered successfully",
    });
  } catch (error) {
    console.log("signup error is ", error);
    return res.status(500).json({
      success: false,
      message: "User cannot be registered. Please try again",
    });
  }
};

//login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and Password are required",
      });
    }

    //check if user exists
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(401).json({
        success: false,
        message: "You are not signed up!",
      });
    }

    //check password
    if (await bcrypt.compare(password, existingUser.password)) {
      //make token
      const payload = {
        email: existingUser.email,
        highestScore: existingUser.highestScore,
        allScores: existingUser.scores,
      };

      //make the token
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      //save the token in user schema
      existingUser.token = token;

      //protect the password
      existingUser.password = undefined;

      //sending the token in the cookie
      const cookieOptions = {
        expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };

      //sending the cookie in the response
      res.cookie("token", token, cookieOptions).status(200).json({
        success: true,
        message: "You are logged in successfully",
        token: existingUser.token,
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }
  } catch (error) {
    console.error("login error is ", error);
    return res.status(500).json({
      success: false,
      message: "Error while logging in. Please try again",
    });
  }
};
