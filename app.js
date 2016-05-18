var express = require("express");
var app = express();
var logger = require('./logger');
var fruitRoute = require("./routes/fruits");

// logger from logger module
app.use(logger);

// serve static files in /public
app.use(express.static("public"));

// routes
app.use('/fruits',fruitRoute);

app.listen(8080,function(){
	console.log("This server is listening on 8080");
});

//modified by shawn
