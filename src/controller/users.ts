import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/users";

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error: any) {
    res.status(404).json({
      message: error.message,
    });
  }
};

export const createUsersRegister = async (
  req: Request,
  res: Response
): Promise<Response<any, Record<string, any>> | void> => {
  const { name, email, password, passwordAgain, phone, address, city } =
    req.body;
  try {
    const userCheck = await User.findOne({ $or: [{ name }, { email }] });
    if (userCheck) {
      if (userCheck.name === name) {
        return res.status(400).json({ message: "User already exists." });
      }
      if (userCheck.email === email) {
        return res.status(400).json({ message: "Email already exists." });
      }
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters." });
    }
    if (password !== passwordAgain) {
      return res.status(400).json({ message: "Passwords don't match." });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      phone,
      address,
      city,
    });
    const token = jwt.sign(
      { email: newUser.email },
      process.env.ACCESS_TOKEN_SECRET || "",
      { expiresIn: process.env.JWT_EXPIRES_IN || "1h" }
    );
    return res.status(201).json({
      newUser,
      token,
    });
  } catch (error: any) {
    return res.status(409).json({
      message: error.message,
    });
  }
};

export const login = async (
  req: Request,
  res: Response
): Promise<Response<any, Record<string, any>> | void> => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User doesn't exist." });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials." });
    }
    const token = jwt.sign(
      { email: user.email },
      process.env.ACCESS_TOKEN_SECRET || "",
      { expiresIn: process.env.JWT_EXPIRES_IN || "1h" }
    );
    res.status(200).json({ user, token });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};
