/* eslint-disable no-unused-vars */
const mongoose = require("mongoose");
const {User} = require("./user.model");

const productSchema = mongoose.Schema({
  image: {
    type: String
  },
  name: {
    type: String,
    required: true,
    maxlength: 50,
    trim: true
  },
  description: {
    type: String,
    maxlength: 255,
    trim: true
  },
  category: {
    type: String,
    maxlength: 50,
    trim: true
  },
  price: {
    type: Number,
    default: 0
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User
  }
});

productSchema.method('toJSON', function () {
  const {
    __v, ...object 
  } = this.toObject({ virtuals:true });
  object.id = object._id;

  // delete object.password;
  return object;
});

const Product = mongoose.model("Product", productSchema);

exports.productSchema = productSchema;
exports.Product = Product; 