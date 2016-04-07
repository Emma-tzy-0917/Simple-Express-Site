var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var parserUrlEncoded = bodyParser.urlencoded({extended:false});
var logger = require('./logger');

// data stored here
var fruitData = {
	"apple": "Apple is not my favorite fruit",
	"orange": "I love Organges!",
	"grape": "Grapes are fine."
}

// logger from logger module
app.use(logger);

// parse parameters 
app.param('queryFruit',function(req,res,next) {
	var name = req.params.queryFruit;
	var processedName = name.toLowerCase();
	req.fruitName = processedName;
	next();
});
// serve static files in /public
app.use(express.static("public"));

// routes here
app.route('/fruits')
	.get(function(req,res){
	var fruits = Object.keys(fruitData);
	res.json(fruits);
	})
	.post(parserUrlEncoded,function (req,res) {	
		var newFruit = req.body;
		fruitData[newFruit.fruitName] = newFruit.fruitDescription;
		res.status(201).json(newFruit.fruitName);
	});

app.route('/fruits/:queryFruit')
	.get(function(req,res){
		var sentence = fruitData[req.fruitName];
		if(!sentence) res.status(404).json("Sentence for "+req.params.fruits +" is not found.");
		else res.json(sentence);
	})
	.delete(function(req,res){
		delete fruitData[req.fruitName];
		res.sendStatus(200);
	});

app.listen(8080,function(){
	console.log("This server is listening on 8080");
});