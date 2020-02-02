const mongoose = require("mongoose");

const { Schema } = mongoose;
const uniqueValidator = require('mongoose-unique-validator');

const schema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      required: true,
      uniqueCaseInsensitive: true,
      validate: {
        validator: email =>
          Promise.resolve(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)),
        message: "Please enter a valid email address"
      }
    },
    password: {
      type: String,
      required: true
    },
    following: [
      {
        type: Schema.Types.ObjectId,
        ref: "User"
      }
    ],
    followers: [
      {
        type: Schema.Types.ObjectId,
        ref: "User"
      }
    ]
  },
  {
    timestamps: true
  }
);

schema.plugin(uniqueValidator)
const User = mongoose.model("User", schema);
module.exports = User;
