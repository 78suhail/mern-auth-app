import bcrypt from "bcryptjs";
import User from "../models/user_Models.js";
import generateToken from "../config/token.js";
import CloudinaryUploadImage from "../utils/Cloudinary.js";

//=========== Function to handle user signup=============//

export const signup = async (req, res) => {
  try {
    const { firstName, lastName, email, password, userName } = req.body;
    if (!firstName || !lastName || !email || !password || !userName) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUsername = await User.findOne({ userName });
    if (existingUsername) {
      return res.status(400).json({ message: "Username already in use" });
    }
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: "Email already in use" });
    }

    //Upload image to Cloudinary
    let profileImageUrl = null;
    if (req.file?.path) {
      profileImageUrl = await CloudinaryUploadImage(req.file.path);
      console.log("Uploaded image URL:", profileImageUrl);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      userName,
      profileImage: profileImageUrl || null,
    });

    let token = generateToken({ id: user._id });
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

//========= Function to handle user login============//

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }
    let existsUser = await User.findOne({ email });
    if (!existsUser) {
      return res
        .status(400)
        .json({ message: "Invalid email or user does not exist" });
    }
    let isMatch = await bcrypt.compare(password, existsUser.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Password" });
    }
    let token = generateToken({ id: existsUser._id });
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ message: "Login successful", user: existsUser });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

//============Function to handle user logout==================//

export const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

// getUser Data
export const getUserData = async (req, res) => {
  try {
    const userId = req.userId; 

    if (!userId) {
      return res.status(404).json({ message: "User ID not found in request" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error("getUserData error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
