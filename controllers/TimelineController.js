const User = require("../models/User.js");
const Tweet = require("../models/Tweet.js");

exports.index = async (req, res) => {
	let id = req.params.id ? req.params.id: req.user ? req.user._id: null;
	if (!id) { 
		return res.status(200).json({ success: true, tweets: [] }) 
	}
	User.findById(id, (err, user) => {
		if (err) {
			return res.status(404).json({ success: false, message: 'An error occured' });
		}
		user.following.push(user._id);
		Tweet.find({ owner: { $in: user.following } }, (err, tweets) => {
			if (err) {
	    		return res.status(404).json({ success: false, message: 'An error occured' });
	    	}
	    	return res.status(200).json({ success: true, tweets });
		})
	})
}
