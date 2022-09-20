const { body, param } = require('express-validator');
const { User } = require('../models/user.model');
const makeMongoDbServiceUser = require('../services/mongoDbService')({ model: User});

module.exports = {
  
  create: [
    body('firstname', 'Name can not be empty').exists({checkFalsy: true}).isString(),
    body('lastname', 'Category can not be empty').exists({checkFalsy: true}).isString(),
    body('email', 'Email can not be empty').exists({checkFalsy: true}).isString(),
    body('password', 'Password can not be empty').exists({checkFalsy: true}).isString(),
  ],

  update: [
    param('id', 'User id is required').exists({checkFalsy: true}),
    body('firstname', 'Name can not be empty').exists({checkFalsy: true}).isString(),
    body('lastname', 'Category can not be empty').exists({checkFalsy: true}).isString(),
    body('email', 'Email can not be empty').exists({checkFalsy: true}).isString(),
    body('password', 'Password can not be empty').exists({checkFalsy: true}).isString(),
  ],

  userById: [
    param('id', 'Product not found with this id').exists({ checkFalsy: true }).custom(value => {
      return makeMongoDbServiceUser.getSingleDocumentById(value)
        .then(user => {
          if (!user) {
            return Promise.reject('Product not found!');
          }
        });
    })
  ],
};
