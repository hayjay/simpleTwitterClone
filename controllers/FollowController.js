const User = require("../models/User.js");

exports.follow = (req, res) => {
  User.findById(req.params.id, (err, user) => {
    if (err || !user) {
      return res.status(404).json({ success: false, message: "No user found" });
    }
    //check if the authenticated user is already following the intended person to follow
    if (req.user.following.includes(user._id)) {
      return res
            .status(422)
            .json({ success: false, message: `User can't be followed because you are already following this person.` });
    }
    //validate self follow - Meaning : you cant follow yourself!
    if (req.user._id == req.params.id) {
      return res
            .status(422)
            .json({ success: false, message: `Permission denied! You can't follow yourself.` });
    }
    user.followers.push(req.user);
    user.save(err => {
      if (err) {
        return res
          .status(404)
          .json({ success: false, message: "An error occured." });
      }
      req.user.following.push(user);
      req.user.save(async err => {
        if (err) {
          user.followers.pull(req.user._id);
          await user.save();
          return res
            .status(404)
            .json({ success: false, message: "An error occured." });
        }

        return res
          .status(200)
          .json({ success: true, message: "Operations successful" });
      });
    });
  });
};

exports.unfollow = (req, res) => {
  User.findById(req.params.id, (err, user) => {
    if (err || !user) {
      return res.status(404).json({ success: false, message: "No user found" });
    }

    user.followers.pull(req.user._id);
    user.save(err => {
      if (err) {
        return res
          .status(404)
          .json({ success: false, message: "An error occured." });
      }
      req.user.following.pull(user._id);
      req.user.save(async err => {
        if (err) {
          user.followers.push(req.user._id);
          await user.save();
          return res
            .status(404)
            .json({ success: false, message: "An error occured." });
        }

        return res
          .status(200)
          .json({ success: true, message: "Operations successful" });
      });
    });
  });
};
