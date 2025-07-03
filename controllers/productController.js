// import { v2 as cloudinary } from "cloudinary";
// import productModel from "../models/productModel.js";

// // function for add product
// export const addProduct = async (req, res) => {
//   try {
//     const {
//       name,
//       description,
//       price,
//       category,
//       subCategory,
//       sizes,
//       bestSeller,
//     } = req.body;

//     const image1 = req.files.image1 && req.files.image1[0];
//     const image2 = req.files.image2 && req.files.image2[0];
//     const image3 = req.files.image3 && req.files.image3[0];
//     const image4 = req.files.image4 && req.files.image4[0];

//     const images = [image1, image2, image3, image4].filter(
//       (item) => item !== undefined
//     );

//     const imagesUrl = await Promise.all(
//       images.map(async (item) => {
//         let result = await cloudinary.uploader.upload(item.path, {
//           resource_type: "image",
//         });
//         return result.secure_url;
//       })
//     );

//     const productData = {
//       name,
//       description,
//       category,
//       price: Number(price),
//       subCategory,
//       bestSeller: bestSeller === "true" ? true : false,
//       sizes: JSON.parse(sizes),
//       image: imagesUrl,
//       date: Date.now(),
//     };

//     console.log(productData);

//     const product = new productModel(productData);

//     await product.save();

//     res.json({ success: true, message: "Product Added" });
//   } catch (e) {
//     console.log(e);
//     res.json({ success: false, message: e.message });
//   }
// };

// // function for list product
// export const listProduct = async (req, res) => {
//   try {
//     const products = await productModel.find({});
//     res.json({ success: true, products });
//   } catch (e) {
//     console.log(e);
//     res.json({ success: false, message: e.message });
//   }
// };

// // function for remove product
// export const removeProduct = async (req, res) => {
//   try {
//     await productModel.findByIdAndDelete(req.body.id);
//     res.json({ success: true, message: "Product Removed" });
//   } catch (e) {
//     console.log(e);
//     res.json({ success: false, message: e.message });
//   }
// };

// // function for single product info
// export const singleProduct = async (req, res) => {
//   try {
//     const { productId } = req.body;
//     const product = await productModel.findById(productId);

//     res.json({ success: true, product });
//   } catch (e) {
//     console.log(e);
//     res.json({ success: false, message: e.message });
//   }
// };




<<<<<<< HEAD
import productModel from "../models/productModel.js";
import cloudinary from "cloudinary";
=======
// import productModel from "../models/productModel.js";
// import cloudinary from "cloudinary";

// // Add Product
// const addProduct = async (req, res) => {
//   try {
//     const { name, description, category, subCategory, bestSeller } = req.body;
    
//     // The 'sizes' field from FormData is a string, so we need to parse it back into an array of objects.
//     const sizes = JSON.parse(req.body.sizes);

//     const images = req.files.map((file) => file.path);
//     const uploadedImages = [];

//     for (const image of images) {
//       const result = await cloudinary.v2.uploader.upload(image);
//       uploadedImages.push(result.secure_url);
//     }
    
//     // Create a new product instance with the updated schema.
//     // Notice the top-level 'price' field is removed.
//     const product = new productModel({
//       name,
//       description,
//       category,
//       subCategory,
//       bestSeller,
//       sizes: sizes, // Assign the parsed sizes array directly
//       image: uploadedImages,
//       date: Date.now(),
//     });

//     await product.save();
//     console.log(product.toObject()); // Log the saved product to confirm
//     res.json({ success: true, message: "Product Added" });

//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: "Error adding product" });
//   }
// };

// // Get a single product by ID
// const getProduct = async (req, res) => {
//   try {
//     const product = await productModel.findById(req.params.id);
//     if (product) {
//       res.json({ success: true, product });
//     } else {
//       res.json({ success: false, message: "Product not found" });
//     }
//   } catch (error) {
//     res.json({ success: false, message: "Error fetching product" });
//   }
// };


// // All Products list
// const listProduct = async (req, res) => {
//   try {
//     const products = await productModel.find({});
//     res.json({ success: true, data: products });
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: "Error" });
//   }
// };

// // Remove Product
// const removeProduct = async (req, res) => {
//   try {
//     await productModel.findByIdAndDelete(req.body.id);
//     res.json({ success: true, message: "Product Removed" });
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: "Error" });
//   }
// };

// export { addProduct, listProduct, removeProduct, getProduct };




import productModel from "../models/productModel.js";
import cloudinary from "cloudinary";
import streamifier from "streamifier";
>>>>>>> e0eaa76 (Fixed Read)

// Add Product
const addProduct = async (req, res) => {
  try {
    const { name, description, category, subCategory, bestSeller } = req.body;
<<<<<<< HEAD
    
    // The 'sizes' field from FormData is a string, so we need to parse it back into an array of objects.
    const sizes = JSON.parse(req.body.sizes);

    const images = req.files.map((file) => file.path);
    const uploadedImages = [];

    for (const image of images) {
      const result = await cloudinary.v2.uploader.upload(image);
      uploadedImages.push(result.secure_url);
    }
    
    // Create a new product instance with the updated schema.
    // Notice the top-level 'price' field is removed.
=======
    const sizes = JSON.parse(req.body.sizes);
    const uploadedImages = [];

    // Handle files from memory buffer
    for (const file of req.files) {
      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.v2.uploader.upload_stream(
          { folder: "shyam_sunder_uploads" }, // Optional: specify a folder in Cloudinary
          (error, result) => {
            if (result) {
              resolve(result);
            } else {
              reject(error);
            }
          }
        );
        // Create a readable stream from the file buffer and pipe it to Cloudinary
        streamifier.createReadStream(file.buffer).pipe(stream);
      });
      uploadedImages.push(result.secure_url);
    }

>>>>>>> e0eaa76 (Fixed Read)
    const product = new productModel({
      name,
      description,
      category,
      subCategory,
      bestSeller,
<<<<<<< HEAD
      sizes: sizes, // Assign the parsed sizes array directly
=======
      sizes: sizes,
>>>>>>> e0eaa76 (Fixed Read)
      image: uploadedImages,
      date: Date.now(),
    });

    await product.save();
<<<<<<< HEAD
    console.log(product.toObject()); // Log the saved product to confirm
    res.json({ success: true, message: "Product Added" });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error adding product" });
=======
    res.json({ success: true, message: "Product Added" });

  } catch (error) {
    console.error("Add Product Error:", error);
    res.json({ success: false, message: "Error adding product. See server logs." });
>>>>>>> e0eaa76 (Fixed Read)
  }
};

// Get a single product by ID
const getProduct = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.id);
    if (product) {
      res.json({ success: true, product });
    } else {
      res.json({ success: false, message: "Product not found" });
    }
  } catch (error) {
    res.json({ success: false, message: "Error fetching product" });
  }
};


// All Products list
const listProduct = async (req, res) => {
  try {
    const products = await productModel.find({});
    res.json({ success: true, data: products });
  } catch (error) {
<<<<<<< HEAD
    console.log(error);
=======
>>>>>>> e0eaa76 (Fixed Read)
    res.json({ success: false, message: "Error" });
  }
};

// Remove Product
const removeProduct = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Product Removed" });
  } catch (error) {
<<<<<<< HEAD
    console.log(error);
=======
>>>>>>> e0eaa76 (Fixed Read)
    res.json({ success: false, message: "Error" });
  }
};

export { addProduct, listProduct, removeProduct, getProduct };