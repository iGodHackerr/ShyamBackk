// import jwt from "jsonwebtoken";

// const adminAuth = async (req, res, next) => {
//   try {
//     const { token } = req.headers;

//     if (!token) {
//       return res.json({
//         success: false,
//         message: "Not Authorized! Login again.",
//       });
//     }

//     const token_decode = jwt.verify(token, process.env.JWT_SECRET);

//     if (token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
//       return res.json({
//         success: false,
//         message: "Not Authorized! Login again.",
//       });
//     }

//     next();
//   } catch (e) {
//     console.log(e);
//     res.json({ success: false, message: e.message });
//   }
// };

// export default adminAuth;



import jwt from "jsonwebtoken";

const adminAuth = async (req, res, next) => {
  const { token } = req.headers;
  if (!token) {
    return res.status(401).json({ success: false, message: "Not Authorized. Login Again." });
  }

  try {
    // Verify the token
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    
    // Check if the user ID is 'admin'
    if (token_decode.id === 'admin') {
      // Attach admin ID to the request if needed, though not necessary for this check
      req.body.userId = token_decode.id; 
      next(); // Proceed to the next step (the controller function)
    } else {
        // If the token is valid but not for an admin
        return res.status(403).json({ success: false, message: "Admin access required." });
    }
  } catch (error) {
    console.log("Admin Auth Error:", error);
    res.status(401).json({ success: false, message: "Error in admin authorization." });
  }
};

export default adminAuth;