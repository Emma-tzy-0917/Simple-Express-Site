var express = require("express");
var router = express.Router();
var parserUrlEncoded = bodyParser.urlencoded({extended:false});
var logger = require('./logger');

// data stored here
var fruitData = {
	"apple": "Apple is not my favorite fruit",
	"orange": "I love Organges!",
	"grape": "Grapes are fine."
}

// parse parameters is now moved to app.route('/:queryFruit').all

// routes here
app.route('/')
	.get(function(req,res){
	var fruits = Object.keys(fruitData);
	res.json(fruits);
	})
	.post(parserUrlEncoded,function (req,res) {	
		var newFruit = req.body;
		fruitData[newFruit.fruitName] = newFruit.fruitDescription;
		res.status(201).json(newFruit.fruitName);
	});

app.route('/:queryFruit')
	.all(function(req,res,next) {
		var name = req.params.queryFruit;
		var processedName = name.toLowerCase();
		req.fruitName = processedName;
		next();
	})
	.get(function(req,res){
		var sentence = fruitData[req.fruitName];
		if(!sentence) res.status(404).json("Sentence for "+req.params.fruits +" is not found.");
		else res.json(sentence);
	})
	.delete(function(req,res){
		delete fruitData[req.fruitName];
		res.sendStatus(200);
	});

