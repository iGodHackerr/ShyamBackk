// import express from "express";
// import {
//   allOrders,
//   placeOrder,
//   placeOrderRazorpay,
//   placeOrderStripe,
//   updateStatus,
//   userOrders,
//   verifyStripe,
// } from "../controllers/orderController.js";
// import adminAuth from "../middleware/adminAuth.js";
// import authUser from "../middleware/auth.js";

// const orderRouter = express.Router();

// //ADMIN FEATURE
// orderRouter.post("/list", adminAuth, allOrders);
// orderRouter.post("/status", adminAuth, updateStatus);

// //PAYMENT FEATURE
// orderRouter.post("/place", authUser, placeOrder);
// orderRouter.post("/stripe", authUser, placeOrderStripe);
// orderRouter.post("/razorpay", authUser, placeOrderRazorpay);

// //USER FEATURE
// orderRouter.post("/userorders", authUser, userOrders);

// //VERIFY PAYMENT
// orderRouter.post("/verifystripe", authUser, verifyStripe);

// export default orderRouter;



// import express from "express";
// import authMiddleware from "../middleware/auth.js";
// import {
//   placeOrder,
//   placeOrderCod, // import the new function
//   verifyOrder,
//   userOrders,
//   listOrders,
//   updateStatus,
// } from "../controllers/orderController.js";

// const orderRouter = express.Router();

// orderRouter.post("/place", authMiddleware, placeOrder);
// orderRouter.post("/placecod", authMiddleware, placeOrderCod); // Add the new route
// orderRouter.post("/verify", verifyOrder);
// orderRouter.post("/userorders", authMiddleware, userOrders);
// orderRouter.get('/list', listOrders);
// orderRouter.post("/status", updateStatus);

// // export default orderRouter;
// import express from "express";
// import authMiddleware from "../middleware/auth.js";
// import adminAuth from "../middleware/adminAuth.js";
// import {
//   placeOrder,
//   placeOrderCod,
//   verifyOrder,
//   userOrders,
//   listOrders,
//   updateStatus,
// } from "../controllers/orderController.js";

// const orderRouter = express.Router();

// // Customer Routes
// orderRouter.post("/place", authMiddleware, placeOrder);
// orderRouter.post("/placecod", authMiddleware, placeOrderCod);
// orderRouter.post("/verify", authMiddleware, verifyOrder);
// orderRouter.post("/userorders", authMiddleware, userOrders);

// // --- THIS IS THE FIX ---
// // Changed from .get back to .post to match the original admin frontend
// orderRouter.post('/list', adminAuth, listOrders);

// orderRouter.post("/status", adminAuth, updateStatus);

// export default orderRouter;




import express from "express";
import authMiddleware from "../middleware/auth.js";
import adminAuth from "../middleware/adminAuth.js";
import {
  placeOrder,
  placeOrderCod,
  verifyOrder,
  userOrders,
  listOrders,
  updateStatus,
} from "../controllers/orderController.js";

const orderRouter = express.Router();

// Customer Routes
orderRouter.post("/place", authMiddleware, placeOrder);
orderRouter.post("/placecod", authMiddleware, placeOrderCod);
orderRouter.post("/verify", authMiddleware, verifyOrder);
orderRouter.post("/userorders", authMiddleware, userOrders);

// Admin Routes (Requires adminAuth middleware)
orderRouter.post('/list', adminAuth, listOrders);
orderRouter.post("/status", adminAuth, updateStatus);

export default orderRouter;