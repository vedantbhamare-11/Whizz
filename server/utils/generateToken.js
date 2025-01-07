import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

// Generate JWT token
export const generateTokenAndSetCookie = (res, userId) => {
    const token = jwt.sign({userId}, process.env.JWT_SECRET_KEY, { expiresIn: "1d"});

    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        samSite: "strict",
        maxAge: 1 * 24 * 60 * 60 * 1000
    });

    return token;
};