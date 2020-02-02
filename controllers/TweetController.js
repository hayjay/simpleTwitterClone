const User = require("../models/User.js");
const Tweet = require("../models/Tweet.js");

exports.get = (req, res) => {
  Tweet.findById(req.params.id, function(err, tweet) {
    if (err || !tweet) {
      return res
        .status(404)
        .json({ success: false, message: "Tweet no found." });
    }

    return res.status(200).json({ success: true, tweet });
  });
};

exports.delete = (req, res) => {
  Tweet.findById(req.params.id, function(err, tweet) {
    if (err || !tweet) {
      return res
        .status(404)
        .json({ success: false, message: "Tweet no found." });
    }
    if (tweet.owner !== req.user._id) {
      return res
        .status(404)
        .json({ success: false, message: "User can't delete this tweet." });
    }
    tweet.delete(err => {
      if (err) {
        return res
          .status(404)
          .json({ success: false, message: "An error occured" });
      }
      return res.status(200).json({ success: true, message: "tweet deleled" });
    });
  });
};

exports.create = (req, res) => {
  let tweet = new Tweet();
  tweet.body = req.body.body;
  tweet.owner = req.user._id;
  if (req.params.id) {
    tweet.isReply = true;
    tweet.parent = req.params.id;
  }

  tweet.save((err, tweet) => {
    if (err) {
      return res.status(404).json({
        success: false,
        message: "An error occured",
        err: err.message
      });
    }
    return res.status(200).json({ success: true, tweet });
  });
};

exports.list = (req, res) => {
  let id = req.params.id ? req.params.id : req.user ? req.user._id : null;
  if (!id) {
    return res.status(200).json({ success: true, tweets: [] });
  }
  Tweet.find({ owner: id }, (err, tweets) => {
    if (err) {
      return res
        .status(404)
        .json({ success: false, message: "An error occured" });
    }
    return res.status(200).json({ success: true, tweets });
  });
};
