// import validator from "validator";
// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";

// import userModel from "../models/userModel.js";

// const createToken = (id) => {
//   return jwt.sign({ id }, process.env.JWT_SECRET);
// };
// //Route for user login
// export const loginUser = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await userModel.findOne({ email });
//     if (!user) {
//       return res.json({ success: false, message: "User does not exists" });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);

//     if (isMatch) {
//       const token = createToken(user._id);
//       res.json({ success: true, token });
//     } else {
//       return res.json({ success: false, message: "Invalid Credentials" });
//     }
//   } catch (e) {
//     console.log(e);
//     res.json({ success: false, message: e.message });
//   }
// };

// //Route for user register
// export const registerUser = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;

//     // checking user already exist or not
//     const exists = await userModel.findOne({ email });
//     if (exists) {
//       return res.json({ success: false, message: "User already exists" });
//     }

//     //validating email formate and strong password
//     if (!validator.isEmail(email)) {
//       return res.json({
//         success: false,
//         message: "Please enter a valid email",
//       });
//     }

//     if (password.length < 8) {
//       return res.json({
//         success: false,
//         message: "Please enter a strong password",
//       });
//     }

//     //hashing user password
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     const newUser = new userModel({ name, email, password: hashedPassword });

//     const user = await newUser.save();

//     const token = createToken(user._id);

//     res.json({ success: true, token });
//   } catch (e) {
//     console.log(e);
//     res.json({ success: false, message: e.message });
//   }
// };

// //Route for Admin login
// export const adminLogin = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     if (
//       email === process.env.ADMIN_EMAIL &&
//       password === process.env.ADMIN_PASSWORD
//     ) {
//       const token = jwt.sign(email + password, process.env.JWT_SECRET);
//       res.json({ success: true, token });
//     } else {
//       res.json({
//         success: false,
//         message: "Invalid Credentials",
//       });
//     }
//   } catch (e) {
//     console.log(e);
//     res.json({ success: false, message: e.message });
//   }
// };

import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if credentials match the .env variables
    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      const token = jwt.sign({ id: "admin" }, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid Admin Credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Server Error" });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User does not exist" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Invalid credentials" });
    }
    const token = createToken(user._id);
    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Server Error" });
  }
};

const registerUser = async (req, res) => {
  const { name, password, email } = req.body;
  try {
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: "User already exists with this email" });
    }
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Please enter a valid email" });
    }
    if (password.length < 8) {
      return res.json({ success: false, message: "Password must be at least 8 characters" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });
    const user = await newUser.save();
    const token = createToken(user._id);
    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "An error occurred during registration" });
  }
};

export { loginUser, registerUser , adminLogin };