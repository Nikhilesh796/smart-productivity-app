import express from "express";

const router = express.Router();

// Example route (Modify as needed)
router.get("/", (req, res) => {
  res.send("Auth route working!");
});

export default router;
