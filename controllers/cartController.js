// import userModel from "../models/userModel.js";

// //ADD PRODUCT TO USER CART
// export const addToCart = async (req, res) => {
//   try {
//     const { userId, itemId, size } = req.body;

//     const userData = await userModel.findById(userId);
//     const cartData = await userData.cartData;

//     if (cartData[itemId]) {
//       if (cartData[itemId][size]) {
//         cartData[itemId][size] += 1;
//       } else {
//         cartData[itemId][size] = 1;
//       }
//     } else {
//       cartData[itemId] = {};
//       cartData[itemId][size] = 1;
//     }

//     await userModel.findByIdAndUpdate(userId, { cartData });

//     res.json({ success: true, message: "Added to cart" });
//   } catch (e) {
//     console.log(e);
//     res.json({ success: false, message: e.message });
//   }
// };

// //UPDATE  USER CART
// export const updateCart = async (req, res) => {
//   try {
//     const { userId, itemId, size, quantity } = req.body;
//     const userData = await userModel.findById(userId);
//     const cartData = await userData.cartData;

//     cartData[itemId][size] = quantity;

//     await userModel.findByIdAndUpdate(userId, { cartData });

//     res.json({ success: true, message: "Cart updated" });
//   } catch (e) {
//     console.log(e);
//     res.json({ success: false, message: e.message });
//   }
// };

// //GET USER CART
// export const getUserCart = async (req, res) => {
//   try {
//     const { userId } = req.body;

//     const userData = await userModel.findById(userId);
//     const cartData = await userData.cartData;

//     res.json({ success: true, cartData });
//   } catch (e) {
//     console.log(e);
//     res.json({ success: false, message: e.message });
//   }
// };



import cartModel from "../models/cartModel.js";
import productModel from "../models/productModel.js";

// Add item to cart
const addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity, size, price } = req.body; // price is now expected from the frontend

    if (!userId || !productId || !quantity || !size || !price) {
      return res.json({ success: false, message: "Missing required fields" });
    }

    const product = await productModel.findById(productId);
    if (!product) {
      return res.json({ success: false, message: "Product not found" });
    }

    let cart = await cartModel.findOne({ userId });

    if (!cart) {
      cart = new cartModel({ userId, items: [] });
    }

    // Check if item with the same ID and size already exists
    const itemIndex = cart.items.findIndex(
      (item) => item.productId === productId && item.size === size
    );

    if (itemIndex > -1) {
      // If item exists, update its quantity
      cart.items[itemIndex].quantity += quantity;
    } else {
      // If item doesn't exist, add it to the cart
      cart.items.push({
        productId,
        name: product.name,
        price: price, // Store the price sent from the frontend
        quantity,
        image: product.image[0],
        size,
      });
    }

    await cart.save();
    res.json({ success: true, message: "Added to cart" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error adding to cart" });
  }
};

// Remove item from cart (no changes needed here, but included for context)
const removeFromCart = async (req, res) => {
  try {
    const { userId, productId, size } = req.body;
    const cart = await cartModel.findOne({ userId });

    if (!cart) {
      return res.json({ success: false, message: "Cart not found" });
    }
    
    cart.items = cart.items.filter(
      (item) => !(item.productId === productId && item.size === size)
    );

    await cart.save();
    res.json({ success: true, message: "Removed from cart" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// Get user's cart (no changes needed here)
const getCart = async (req, res) => {
  try {
    const { userId } = req.body;
    const cart = await cartModel.findOne({ userId });
    res.json({ success: true, cart: cart });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

export { addToCart, removeFromCart, getCart };