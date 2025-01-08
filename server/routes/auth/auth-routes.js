const express = require("express");
const { registerUser, login, resetPassword, authMiddleware } = require("../../controllers/auth/auth-controller");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", login);
router.post("/reset-password", authMiddleware, resetPassword);

module.exports = router;