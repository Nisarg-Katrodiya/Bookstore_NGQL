/* eslint-disable no-unused-vars */
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
  firstname: {
    type: String,
    required: true,
    maxlength: 50,
    trim: true
  },
  lastname: {
    type: String,
    required: true,
    maxlength: 50,
    trim: true
  },
  email: {
    type: String,
    maxlength: 255,
    trim: true
  },
  password: {
    type: String,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  }
});

userSchema.method('toJSON', function () {
  const {
    __v, ...object 
  } = this.toObject({ virtuals:true });
  object.id = object._id;

  // delete object.password;
  return object;
});

// pass auth token through the models [encapsulating]
userSchema.methods.generateAuthToken = function() {
  const token = jwt.sign({_id: this._id, role: this.role}, process.env.SECRET_STRING, { expiresIn: process.env.REFRESH_TOKEN_LIFE });
  return token;
};

const User = mongoose.model("User", userSchema);

exports.userSchema = userSchema;
exports.User = User; 