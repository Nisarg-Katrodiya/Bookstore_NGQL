const { body } = require('express-validator');


module.exports = {
  
  login: [
    body('email', 'Email can not be empty').exists({checkFalsy: true}).isString(),
    body('password', 'Password can not be empty').exists({checkFalsy: true}).isString(),
  ],
};
