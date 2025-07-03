import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  items: [
    {
      productId: { type: String, required: true },
      name: { type: String, required: true },
      // Price is now stored per item
      price: { type: Number, required: true },
      quantity: { type: Number, required: true },
      image: { type: String, required: true },
      size: { type: String, required: true },
    },
  ],
});

const cartModel = mongoose.models.cart || mongoose.model("cart", cartSchema);

export default cartModel;