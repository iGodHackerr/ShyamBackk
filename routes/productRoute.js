// import express from "express";
// import {
//   addProduct,
//   listProduct,
//   removeProduct,
//   singleProduct,
// } from "../controllers/productController.js";
// import upload from "../middleware/multer.js";
// import adminAuth from "../middleware/adminAuth.js";

// const productRouter = express.Router();

// productRouter.post(
//   "/add",
//   adminAuth,
//   upload.fields([
//     { name: "image1", maxCount: 1 },
//     { name: "image2", maxCount: 1 },
//     { name: "image3", maxCount: 1 },
//     { name: "image4", maxCount: 1 },
//   ]),
//   addProduct
// );
// productRouter.post("/single", singleProduct);
// productRouter.post("/remove", adminAuth, removeProduct);
// productRouter.get("/list", listProduct);

// export default productRouter;
// import express from "express";
// import {
//   addProduct,
//   listProduct,
//   removeProduct,
//   getProduct,
// } from "../controllers/productController.js";
// import multer from "multer";

// const productRouter = express.Router();

// // Configure multer to store files in memory instead of on disk
// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });

// // Use the new upload middleware for the add product route
// productRouter.post("/add", upload.array("images", 4), addProduct);
// productRouter.get("/list", listProduct);
// productRouter.post("/remove", removeProduct);
// productRouter.get("/get/:id", getProduct);

// export default productRouter;


import express from "express";
import {
  addProduct,
  listProduct,
  removeProduct,
  getProduct,
} from "../controllers/productController.js";
import multer from "multer";

const productRouter = express.Router();

// Configure multer for memory storage (required for Vercel)
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Routes
productRouter.post("/add", upload.array("images", 4), addProduct);
productRouter.get("/list", listProduct);
productRouter.post("/remove", removeProduct);
productRouter.get("/get/:id", getProduct);

export default productRouter;