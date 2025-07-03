// import orderModel from "../models/orderModel.js";
// import userModel from "../models/userModel.js";
// import productModel from "../models/productModel.js";
// import Stripe from "stripe";

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// // Helper function to reconstruct items for data integrity
// const getOrderItemsWithDetails = async (items) => {
//   const detailedItems = await Promise.all(
//     items.map(async (item) => {
//       const product = await productModel.findById(item.productId);
//       if (product) {
//         return {
//           productId: product._id,
//           name: product.name,
//           image: product.image[0],
//           price: item.price,
//           quantity: item.quantity,
//           size: item.size,
//         };
//       }
//       return null;
//     })
//   );
//   return detailedItems.filter(item => item !== null);
// };

// // Placing user order via Stripe
// const placeOrder = async (req, res) => {
//   const frontend_url = "http://localhost:5173";
//   try {
//     const detailedItems = await getOrderItemsWithDetails(req.body.items);
//     const newOrder = new orderModel({
//       userId: req.body.userId,
//       items: detailedItems,
//       amount: req.body.amount,
//       address: req.body.address,
//     });
//     await newOrder.save();
//     await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

//     const line_items = detailedItems.map((item) => ({
//       price_data: {
//         currency: "inr",
//         product_data: { name: item.name },
//         unit_amount: item.price * 100,
//       },
//       quantity: item.quantity,
//     }));
//     if (req.body.amount > detailedItems.reduce((sum, item) => sum + item.price * item.quantity, 0)) {
//         line_items.push({
//             price_data: { currency: "inr", product_data: { name: "Delivery Charges" }, unit_amount: 50 * 100 },
//             quantity: 1,
//         });
//     }

//     const session = await stripe.checkout.sessions.create({
//       line_items,
//       mode: "payment",
//       success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
//       cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
//     });
//     res.json({ success: true, session_url: session.url });

//   } catch (error) {
//     console.log("Stripe Order Error:", error);
//     res.json({ success: false, message: "Error placing Stripe order" });
//   }
// };

// // Placing user order via COD
// const placeOrderCod = async (req, res) => {
//     try {
//         const detailedItems = await getOrderItemsWithDetails(req.body.items);
//         const newOrder = new orderModel({
//             userId: req.body.userId,
//             items: detailedItems,
//             amount: req.body.amount,
//             address: req.body.address,
//             payment: false,
//             status: "Order Placed"
//         });
//         await newOrder.save();
//         await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });
//         res.json({ success: true, message: "Order placed via COD successfully!" });
//     } catch (error) {
//         console.log("COD Order Error:", error);
//         res.json({ success: false, message: "Error placing COD order" });
//     }
// }

// // --- THIS IS THE KEY FIX ---
// // List all orders for admin panel
// const listOrders = async (req, res) => {
//   try {
//     const orders = await orderModel.find({});
//     // Send the data back with the key 'orders' to match the original frontend code
//     res.json({ success: true, orders: orders });
//   } catch (error) {
//     console.log("List Orders Error:", error);
//     res.json({ success: false, message: "Error fetching orders" });
//   }
// };

// const verifyOrder = async (req, res) => {
//     const { orderId, success } = req.body;
//     try {
//         if (success == "true") {
//             await orderModel.findByIdAndUpdate(orderId, { payment: true });
//             res.json({ success: true, message: "Paid" })
//         } else {
//             await orderModel.findByIdAndDelete(orderId)
//             res.json({ success: false, message: "Not Paid" })
//         }
//     } catch (error) {
//         res.json({ success: false, message: "Error Verifying" })
//     }
// };

// const userOrders = async (req, res) => {
//     try {
//         const orders = await orderModel.find({ userId: req.body.userId });
//         res.json({ success: true, data: orders })
//     } catch (error) {
//         res.json({ success: false, message: "Error" })
//     }
// };

// const updateStatus = async (req, res) => {
//     try {
//         await orderModel.findByIdAndUpdate(req.body.orderId, { status: req.body.status });
//         res.json({ success: true, message: "Status Updated" })
//     } catch (error) {
//         res.json({ success: false, message: "Error" })
//     }
// };

// export { placeOrder, placeOrderCod, verifyOrder, userOrders, listOrders, updateStatus };

// import orderModel from "../models/orderModel.js";
// import userModel from "../models/userModel.js";
// import productModel from "../models/productModel.js";
// import Stripe from "stripe";

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// // Helper to get full item details for data integrity
// const getOrderItemsWithDetails = async (items) => {
//   const detailedItems = await Promise.all(
//     items.map(async (item) => {
//       const product = await productModel.findById(item.productId);
//       if (product) {
//         return {
//           productId: product._id,
//           name: product.name,
//           image: product.image[0],
//           price: item.price,
//           quantity: item.quantity,
//           size: item.size,
//         };
//       }
//       return null;
//     })
//   );
//   return detailedItems.filter(item => item !== null);
// };

// // Helper to calculate total from items securely on the backend
// const calculateSubtotal = (items) => {
//     return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
// }

// // Placing user order via Stripe
// const placeOrder = async (req, res) => {
//   const frontend_url = "http://localhost:5173"; // Replace with your live frontend URL in production
//   try {
//     const detailedItems = await getOrderItemsWithDetails(req.body.items);
    
//     const subtotal = calculateSubtotal(detailedItems);
//     const shippingFee = subtotal > 0 && subtotal < 500 ? 50 : 0;
//     const totalAmount = subtotal + shippingFee;

//     const newOrder = new orderModel({
//       userId: req.body.userId,
//       items: detailedItems,
//       amount: totalAmount,
//       address: req.body.address,
//     });
//     await newOrder.save();
//     await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

//     const line_items = detailedItems.map((item) => ({
//       price_data: { currency: "inr", product_data: { name: item.name }, unit_amount: item.price * 100 },
//       quantity: item.quantity,
//     }));

//     if (shippingFee > 0) {
//         line_items.push({
//             price_data: { currency: "inr", product_data: { name: "Delivery Charges" }, unit_amount: shippingFee * 100 },
//             quantity: 1,
//         });
//     }

//     const session = await stripe.checkout.sessions.create({
//       line_items,
//       mode: "payment",
//       success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
//       cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
//     });
//     res.json({ success: true, session_url: session.url });

//   } catch (error) {
//     console.log("Stripe Order Error:", error);
//     res.json({ success: false, message: "Error placing Stripe order" });
//   }
// };

// // Placing user order via COD
// const placeOrderCod = async (req, res) => {
//     try {
//         const detailedItems = await getOrderItemsWithDetails(req.body.items);
        
//         const subtotal = calculateSubtotal(detailedItems);
//         const shippingFee = subtotal > 0 && subtotal < 500 ? 50 : 0;
//         const totalAmount = subtotal + shippingFee;

//         const newOrder = new orderModel({
//             userId: req.body.userId,
//             items: detailedItems,
//             amount: totalAmount,
//             address: req.body.address,
//             payment: false,
//             status: "Order Placed"
//         });
//         await newOrder.save();
//         await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });
//         res.json({ success: true, message: "Order placed via COD successfully!" });
//     } catch (error) {
//         console.log("COD Order Error:", error);
//         res.json({ success: false, message: "Error placing COD order" });
//     }
// }

// // List all orders for admin panel
// const listOrders = async (req, res) => {
//   try {
//     const orders = await orderModel.find({});
//     // Send back with 'orders' key for the original admin frontend
//     res.json({ success: true, orders: orders }); 
//   } catch (error) {
//     console.log("List Orders Error:", error);
//     res.json({ success: false, message: "Error fetching orders" });
//   }
// };

// const verifyOrder = async (req, res) => {
//     const { orderId, success } = req.body;
//     try {
//         if (success === "true") {
//             await orderModel.findByIdAndUpdate(orderId, { payment: true });
//             res.json({ success: true, message: "Paid" })
//         } else {
//             await orderModel.findByIdAndDelete(orderId)
//             res.json({ success: false, message: "Not Paid" })
//         }
//     } catch (error) {
//         res.json({ success: false, message: "Error Verifying" })
//     }
// };

// const userOrders = async (req, res) => {
//     try {
//         const orders = await orderModel.find({ userId: req.body.userId });
//         res.json({ success: true, data: orders })
//     } catch (error) {
//         res.json({ success: false, message: "Error" })
//     }
// };

// const updateStatus = async (req, res) => {
//     try {
//         await orderModel.findByIdAndUpdate(req.body.orderId, { status: req.body.status });
//         res.json({ success: true, message: "Status Updated" })
//     } catch (error) {
//         res.json({ success: false, message: "Error" })
//     }
// };

// export { placeOrder, placeOrderCod, verifyOrder, userOrders, listOrders, updateStatus };


import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import productModel from "../models/productModel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Helper to get full item details
const getOrderItemsWithDetails = async (items) => {
  if (!items || !Array.isArray(items)) return [];
  const detailedItems = await Promise.all(
    items.map(async (item) => {
      if (!item.productId) return null;
      const product = await productModel.findById(item.productId);
      if (product) {
        return {
          productId: product._id,
          name: product.name,
          image: product.image[0],
          price: item.price,
          quantity: item.quantity,
          size: item.size,
        };
      }
      return null;
    })
  );
  return detailedItems.filter(item => item !== null);
};

// Helper to calculate total from items
const calculateSubtotal = (items) => {
    return items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
}

// Place order via Stripe
const placeOrder = async (req, res) => {
  const frontend_url = process.env.FRONTEND_URL || "http://localhost:5173";
  try {
    const detailedItems = await getOrderItemsWithDetails(req.body.items);
    if (detailedItems.length === 0) {
      return res.json({ success: false, message: "Cart is empty or contains invalid items." });
    }
    const subtotal = calculateSubtotal(detailedItems);
    const shippingFee = subtotal > 0 && subtotal < 500 ? 50 : 0;
    const totalAmount = subtotal + shippingFee;

    const newOrder = new orderModel({
      userId: req.body.userId,
      items: detailedItems,
      amount: totalAmount,
      address: req.body.address,
    });
    await newOrder.save();
    await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

    const line_items = detailedItems.map((item) => ({
      price_data: { currency: "inr", product_data: { name: item.name }, unit_amount: item.price * 100 },
      quantity: item.quantity,
    }));
    if (shippingFee > 0) {
        line_items.push({
            price_data: { currency: "inr", product_data: { name: "Delivery Charges" }, unit_amount: shippingFee * 100 },
            quantity: 1,
        });
    }

    const session = await stripe.checkout.sessions.create({
      line_items, mode: "payment",
      success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
    });
    res.json({ success: true, session_url: session.url });

  } catch (error) {
    console.log("Stripe Order Error:", error);
    res.json({ success: false, message: "Error placing Stripe order" });
  }
};

// Place order via COD
const placeOrderCod = async (req, res) => {
    try {
        const detailedItems = await getOrderItemsWithDetails(req.body.items);
        if (detailedItems.length === 0) {
            return res.json({ success: false, message: "Cart is empty or contains invalid items." });
        }
        const subtotal = calculateSubtotal(detailedItems);
        const shippingFee = subtotal > 0 && subtotal < 500 ? 50 : 0;
        const totalAmount = subtotal + shippingFee;
        const newOrder = new orderModel({
            userId: req.body.userId, items: detailedItems, amount: totalAmount,
            address: req.body.address, payment: false, status: "Order Placed"
        });
        await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });
        res.json({ success: true, message: "Order placed via COD successfully!" });
    } catch (error) {
        console.log("COD Order Error:", error);
        res.json({ success: false, message: "Error placing COD order" });
    }
}

// List all orders for admin
const listOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({ success: true, orders: orders });
  } catch (error) {
    res.json({ success: false, message: "Error fetching orders" });
  }
};

const verifyOrder = async (req, res) => { /* ... (no changes needed) */ };
const userOrders = async (req, res) => { /* ... (no changes needed) */ };
const updateStatus = async (req, res) => { /* ... (no changes needed) */ };

export { placeOrder, placeOrderCod, verifyOrder, userOrders, listOrders, updateStatus };