const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user.models");
const getDataUri = require("../utils/dataURI.js");
const cloudinary = require("../config/cloudinary.config.js");

exports.signup = async (req, res) => {
  try {
    const { username, email, password, phone, role } = req.body;
    // console.log(req.body);

    if (!username || !email || !password || !phone || !role) {
      return res.status(422).json({
        success: false,
        message: "all fields are required",
      });
    }

    const file = req.file;
    // console.log("Received File:", req.file);
    if (!file) {
      return res
        .status(400)
        .json({ message: "Profile photo is required", success: false });
    }

    const fileUri = getDataUri(file);
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists, please login!",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new userModel({
      username,
      email,
      password: hashedPassword,
      phone,
      role,
      profilePhoto: cloudResponse.secure_url,
    });
    await newUser.save();

    // console.log(newUser);

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });

    // console.log(token);
    user = {
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      phone: newUser.phone,
      role: newUser.role,
      profilePhoto: newUser.profilePhoto,
    };

    return res
      .status(200)
      .cookie("cookieToken", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .json({
        success: true,
        message: `${newUser.username} 😀 You registered successfully`,
        user,
      });
  } catch (error) {
    console.error("Error during user registration:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password) {
      return res.status(422).json({
        success: false,
        message: "all fields are required",
      });
    }

    if (!role) {
      return res.status(422).json({
        success: false,
        message: "Please, select your Role",
      });
    }

    const existingUser = await userModel.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({
        success: false,
        message: "User not exists, please signUp!",
      });
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (role !== existingUser.role) {
      return res.status(400).json({
        message: "Account doesn't exist with current role",
        success: false,
      });
    }

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid password. Please try again.",
      });
    }

    const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });

    user = {
      _id: existingUser._id,
      username: existingUser.username,
      email: existingUser.email,
      phone: existingUser.phone,
      role: existingUser.role,
      profilePhoto: existingUser.profilePhoto,
    };

    return res
      .status(200)
      .cookie("cookieToken", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
      })
      .json({
        success: true,
        message: `Wellcome Back ${existingUser.username}`,
        user,
      });
  } catch (error) {
    console.error("Error during user login:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

exports.logout = async (req, res) => {
  try {
    return res
      .status(200)
      .cookie("cookieToken", "", {
        maxAge: 0,
      })
      .json({
        success: true,
        message: "logout successfully",
      });
  } catch (error) {
    console.error("Error during user logout:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
