import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";

export  function generateToken(user) {
    try{
  return jwt.sign(
    { username: user.username,email: user.email,phone : user.phone},
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  ); }catch(error){
    console.log("Error generating token",error);
  }
}