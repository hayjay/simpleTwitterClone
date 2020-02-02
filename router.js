const express = require("express");

const AuthController = require("./controllers/AuthController");
const TweetController = require("./controllers/TweetController");
const FollowController = require("./controllers/FollowController");
const TimelineController = require("./controllers/TimelineController");
const SearchController = require("./controllers/SearchController");

const authenticate = require("./middlewares/authenticate");

const router = express.Router();

//auth
router.post("/login", AuthController.login);
router.post("/register", AuthController.register);

//follow
router.post("/follow/:id", authenticate, FollowController.follow);
router.post("/unfollow/:id", authenticate, FollowController.unfollow);

//tweet

router.get("/tweets/:id", authenticate, TweetController.get);
router.post("/tweets/:id?", authenticate, TweetController.create);
router.delete("/tweets/:id", authenticate, TweetController.delete);

router.get("/user/tweets/:id?", authenticate, TweetController.list);

//timeline
router.get("/timeline", authenticate, TimelineController.index);

//search - This endpoint helps in searching for both tweets and users based on the intended search key
router.get("/search", SearchController.index);

module.exports = router;
