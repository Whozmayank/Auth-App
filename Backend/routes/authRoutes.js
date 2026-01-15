const express = require("express");
const { login, register } = require("../controller/authController");

const router = express.Router();

router.post("/register", register); //register route
router.post("/login", login); //login route

module.exports = router;
