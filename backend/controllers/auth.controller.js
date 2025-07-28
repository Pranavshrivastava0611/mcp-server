import { signupSchema, loginSchema } from "../utils/agent.schema.js";
import bcrypt from "bcrypt";
import db from "../utils/db.js"
import { agents } from "../lib/schema.js";
import { and, eq, is } from "drizzle-orm";
import dotenv from "dotenv";
import { generateToken } from "../utils/jwt.js";
dotenv.config();

export const signup = async (req, res) => {
  try {
    const parsed = signupSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ status: "error", message: parsed.error.message });
    }
    const { username, email, password, phone } = parsed.data;
    const [existingUser] = await db
  .select()
  .from(agents)
  .where(eq(agents.username, username));

if (existingUser) {
  return res.status(400).json({ status: "error", message: "User already exists" });
}
    const hashedPassword = await bcrypt.hash(password, 10);
    const [user] = await db.insert(agents).values({
      username,
      email,
      password: hashedPassword,
      phone,
    }).returning();

    const token = generateToken(user);

    return res.status(201).cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000,
      }).json({
      status: "success",
      message: "Signup successful",
      token,
      user: { username: user.username, email: user.email,phone : user.phone },
    });
  } catch (err) {
    return res.status(500).json({ status: "error", message: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const parsed = loginSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ status: "error", message: parsed.error.message });
    }

    const { username, password } = parsed.data;
    const user = await db.select().from(agents).where(eq(agents.username, username)); ///username is unique so searech by this pranav
    if (!user) {
      return res.status(400).json({ status: "error", message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user[0].password);
    if (!isMatch) {
      return res.status(400).json({ status: "error", message: "Invalid credentials" });
    }
    const token = generateToken(user[0]);
    
    return res.status(200).cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000,
      }).json({
      status: "success",
      message: "Login successful",
      token,
      user: { id: user[0].id, username: user[0].username, email: user[0].email },
    });
  } catch (err) {
    return res.status(500).json({ status: "error", message: "Internal server error" });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });

    return res.status(200).json({
      status: "success",
      message: "Logged out successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Something went wrong during logout",
    });
  }
};
