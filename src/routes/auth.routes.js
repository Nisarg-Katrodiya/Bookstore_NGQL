const express = require("express");
const router = express.Router();

const validate = require('../validations/handler');
const rules = require('../validations/auth.validation');
const authentication = require("../controller/auth");

// user login
router.post("/login", validate(rules.login), authentication.login);

module.exports = router;