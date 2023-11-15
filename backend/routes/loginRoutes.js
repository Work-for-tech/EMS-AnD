const express = require("express");
const router = express.Router();

const login = require("../controller/loginController");

router.post("", login.loginUser);

router.post("/verify", login.verifyToken);

module.exports = router;
