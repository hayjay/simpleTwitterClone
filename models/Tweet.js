const mongoose = require("mongoose");

const { Schema } = mongoose;

const schema = new Schema(
  {
    body: {
      type: String,
      required: true
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    isReply: {
      type: Boolean,
      default: false
    },
    parent: {
      type: Schema.Types.ObjectId,
      ref: "Tweet"
    }
  },
  {
    timestamps: true
  }
);

const User = mongoose.model("Tweet", schema);
module.exports = User;
