var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var messageSchema = new Schema({
	time: {type: Date, default: Date.now},
    sender: String,
    body: String,
    receiver: String
});

module.exports = mongoose.model('Message', messageSchema);