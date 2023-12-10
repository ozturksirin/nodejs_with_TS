import express from "express";
import UserRouter from "./UserRouter";
const router = express.Router();

router.get("/test", (req, res) => {
  res.send("This is the test router.");
});

router.use("/", UserRouter);

export default router;
