var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userSchema = new Schema({
    username: {type: String, index: {unique: true}},
    password: String
});

module.exports = mongoose.model('User', userSchema);