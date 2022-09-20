/* eslint-disable no-unused-vars */
const express = require('express');
const router = express.Router();

const validate = require('../validations/handler');
const rules = require('../validations/user.validation');
const user = require('../controller/user');

// Create a new user
router.post('/', validate(rules.create), user.create);

// Retrieve all user
router.get('/', user.findAll);

// Retrieve all user
router.get('/:id', validate(rules.userById), user.findById);

// Update a user with id
router.put('/:id', validate(rules.update), user.update);

// Delete a user with id
router.delete('/:id', user.delete);

module.exports = router;