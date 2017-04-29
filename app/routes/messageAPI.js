var mongoose = require('mongoose');
var config = require('../../config');
var User = require('../models/user');
var Message = require('../models/message');
var exec = require('child_process').exec;

module.exports = function(app, express) {
	var api = express.Router();
	
	var vm = this;

	api.post('/sendMessage', function(req, res, err) {
		var data = req.body;
		data.sender = req.session.username;
		var message = new Message(data);
		message.save(function(err) {
			if(err) {
				res.json({
					msg: false,
					data: "Message sending failed"
				});
			} else {
				res.json({
					msg: true,
					data: "Message sent successfully"
				});
			}
		});
	});

	api.post('/recieveMessages', function(req, res, err) {
		Message.find({receiver: req.session.username}, function(err, message) {
			if(err) {
				res.json({
					msg: false,
					data: err
				})
			} else if(!message) {
				res.json({
					msg: false,
					data: "Fetching messages failed"
				})
			} else {
				res.json({
					msg: true,
					data: message
				})
			}
		})
	});

	api.post('/verify', function(req, res, err) {
		var data = req.body.body;
		exec("sage SageCodes/code1.sage '" + data + "'",function(stderr, stdout, error) {
			res.json({
				msg: true,
				data: {
					stderr: stderr,
					stdout: stdout,
					error: error
				}
			});
		});
	});

	api.post('/simulate', function(req, res, err) {
		var data = req.body.body;
		exec("sage SageCodes/code2.sage '" + data + "'",function(stderr, stdout, error) {
			res.json({
				msg: true,
				data: {
					stderr: stderr,
					stdout: stdout,
					error: error
				}
			});
		});
	});

	return api;
}