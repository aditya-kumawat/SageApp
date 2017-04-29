var express = require('express');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');
var exec = require('child_process').exec;
var config = require('./config');

var app = express();

app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: 'true'}));
app.use(bodyParser.json());

app.use(session({ 
	secret: config.sessionSecret,
	saveUninitialized: true,
  	resave: true
}));

var userAPI = require('./app/routes/userAPI')(app, express);
var messageAPI = require('./app/routes/messageAPI')(app, express);
app.use('/userAPI', userAPI);
app.use('/messageAPI', messageAPI);

mongoose.connect(config.database, function(err){
	if(err) {
		console.log(err);
	} else {
		console.log('Connected to the database.');
	}
});

app.use(express.static(__dirname + '/public'));
app.use('/', express.static(__dirname + '/public/views'));

app.listen(config.port, function(err) {
	if(err)
		console.log("Error connection to port %s", config.port);
	else
		console.log("Connected to port %s", config.port);
});

app.get('*', function(req, res){
	res.sendFile(__dirname + '/public/views/index.html');
});