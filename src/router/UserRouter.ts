import express from "express";
import { postgresClient } from "../config/db";

const userRouter = express.Router();

// userRouter.get("/user-get", async (req, res) => {
//   try {
//     const text = "SELECT * FROM users";
//     const result = await postgresClient.query(text);
//     res.send(result.rows);
//     console.log(result);
//   } catch (error) {
//     console.log(error);
//     return res.status(400).json({ message: error.message });
//   }
// });

userRouter.get("/user", (req, res) => {
  res.send("Hello World! This is the user router.");
});

userRouter.post("/user-register");

// userRouter.post("/user-post", async (req, res) => {
//   try {
//     const text =
//       "INSERT INTO users (email,password, fullname) VALUES ($1, crypt($2, gen_salt('bf')), $3) RETURNING *";
//     const values = [req.body.email, req.body.password, req.body.fullname];
//     const result = await postgresClient.query(text, values);
//     res.send(result.rows);
//     console.log(result);
//   } catch (error) {
//     console.log(error);
//     return res.status(400).json({ message: error.message });
//   }
// });

export default userRouter;
