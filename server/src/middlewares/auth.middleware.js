import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

export const verifyToken = (req, res, next) => {
    const token = req.cookies.token;
    console.log('token',token);
    try {
        // Check token valid or not
        if(!token) return res.status(401).json({success: true, message: "Unauthorized - no token provided"});

        // Decode token
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        console.log('decoded',decoded);

        // Check decoded values valid or not
        if(!decoded) return res.status(401).json({success: false, message: "Unauthorized - Invalid token"});

        req.userId = decoded.userId;
        console.log('userId',req.userId);
        next();
    } catch (error) {
        res.status(500).json({success: false, message: "Server error"})
    };
};