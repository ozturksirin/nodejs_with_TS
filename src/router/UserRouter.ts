import express from "express";

const router = express.Router();

// Define your user routes here
router.get("/", (req, res) => {
  res.send("Hello World! This is the user router.");
});

export default router;
