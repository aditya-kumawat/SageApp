var mongoose = require('mongoose');
var config = require('../../config');
var User = require('../models/user');

module.exports = function(app, express) {
	var api = express.Router();
	
	var vm = this;

	api.post('/register', function(req, res, err) {
		var data = req.body;
		data.username = data.username.toLowerCase();
		var user = new User(data);
		user.save(function(err) {
			req.session.username = data.username;
			if(err && err.code!=11000) {
				res.json({
					msg: false,
					data: err
				});
			} else if(err && err.code==11000) {
				res.json({
					msg: false,
					data: "Already registered"
				})
			} else {
				res.json({
					msg: true,
					data: "Login Successful"
				});
			}
		});
	});

	api.post('/login', function(req, res, err) {
		var data = req.body;
		User.findOne(data, function(err, user) {
			if(err) {
				res.json({
					msg: false,
					data: err
				})
			} else if(user) {
				res.json({
					msg: true,
					data: "Already registered, login successful"
				})
			} else {
				res.json({
					msg: false,
					data: "Already registered, login unsuccessful"
				})
			}
		})
	});

	api.post('/checkIfLoggedIn', function(req, res, err) {
		if(req.session.username) {
			res.json({
				msg: true,
				data: "Already logged In",
			});
		} else {
			res.json({
				msg: false,
				data: "Requires login"
			});
		}
	})

	api.post('/getUser', function(req, res, err) {
		if(req.session.username) {
			res.json({
				msg: true,
				data: req.session.username,
			});
		} else {
			res.json({
				msg: false,
				data: "Requires login"
			});
		}
	})

	api.post('/logout', function(req, res, err) {
		req.session.destroy(function(err) {
			if(err)
				res.json({
					msg: false,
					data: "Logout unsuccessful"
				});
			else
				res.json({
					msg: true,
					data: "Logout Successful"
				});
		})
	})

	return api;
}