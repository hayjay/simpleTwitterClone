const User = require("../models/User.js");
const Tweet = require("../models/Tweet.js");

exports.index = async (req, res) => {
	//accept search input from url using query string
	var query = require('url').parse(req.url,true).search.replace('?=', '').trim();
	var search = query;
	let users = User.find({name: { $regex: '.*' + search + '.*', $options: "i" } }, (err, users) => {
		if (err) {
			return res.status(404).json({ success: false, message: 'An error occured' });
		}
		Tweet.find({ body: { $regex: '.*' + search + '.*', $options: "i" }  }, (err, tweets) => {
			if (err) {
	    		return res.status(404).json({ success: false, message: 'An error occured' });
	    	}

	    	return res.status(200).json({ success: true, result: { users,tweets } });
		})
	})
}
