// import express from "express";
// import {
//   adminLogin,
//   loginUser,
//   registerUser,
// } from "../controllers/userController.js";

// const userRouter = express.Router();

// userRouter.post("/register", registerUser);
// userRouter.post("/login", loginUser);
// userRouter.post("/admin", adminLogin);

// export default userRouter;

import express from "express";
import {
  loginUser,
  registerUser,
  adminLogin, // Import the new function
} from "../controllers/userController.js";

const userRouter = express.Router();

// Existing user routes
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);

// --- NEW: Admin Login Route ---
userRouter.post("/admin-login", adminLogin);

export default userRouter;