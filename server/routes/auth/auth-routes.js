const express = require("express");
const { registerUser, login, resetPassword } = require("../../controllers/auth/auth-controller");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", login);
router.post("/reset-password", resetPassword);

module.exports = router;