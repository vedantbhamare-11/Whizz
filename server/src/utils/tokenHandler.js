import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

// Generate JWT token
const generateTokenAndSetCookie = (res, userId) => {
  try {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      samSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });

    return token;
  } catch (error) {
    throw new Error("Failed to generate and set the authentication cookie.");}
};

const removeTokenAndCookie = (res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
  } catch (error) {
    throw new Error("Failed to clear the authentication cookie.");
  }
};

export { generateTokenAndSetCookie, removeTokenAndCookie };
