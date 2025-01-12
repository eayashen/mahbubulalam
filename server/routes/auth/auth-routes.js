const express = require("express");
const {
  registerUser,
  login,
  resetPassword,
  authMiddleware,
} = require("../../controllers/auth/auth-controller");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", login);
router.post("/reset-password", authMiddleware, resetPassword);
router.get("/check-auth", authMiddleware, (req, res) => {
  const user = req.user;
  res.status(200).json({ success: true, message: "User authenticated", user });
});

module.exports = router;