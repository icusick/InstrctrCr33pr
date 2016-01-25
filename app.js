var express = require('express');
var app = express();
var MongoClient = require('mongodb').MongoClient;
var bodyParser = require('body-parser');

// Config
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs')

// db
var db;
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;
var mongoUrl = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/instrctr_app_dev';
MongoClient.connect(mongoUrl, function(err, database) {
  if (err) { throw err; }
  db = database;
  process.on('exit', db.close);
});

// Routes
app.get('/', function(req, res){
	res.render('index')
})

app.get('/sung', function(req, res){
	db.collection('sung').find({}).toArray(function(err, result) {
  	console.log(result)
  	res.json(result);
  })
})

app.get('/anna', function(req, res){
	db.collection('anna').find({}).toArray(function(err, result) {
  	console.log(result)
  	res.json(result);
  })
})

app.get('/phil', function(req, res){
	db.collection('phil').find({}).toArray(function(err, result) {
		res.json(result)
	})
})

app.get('/newSung', function(req, res){

})

app.post('/sung', function(req, res){
	db.collection('sung').insert({
		date: req.body.date,
		footwear: req.body.footwear,
		ascot: req.body.ascot,
		outfit: req.body.outfit
	}, function(err, result) {
		res.redirect('/');
	});
})

app.get('/newPhil', function(req, res) {
	res.render('phil')
})

app.post('/newPhil', function(req, res) {
	db.collection('phil').insert({
		date: req.body.date,
		coffee: req.body.coffee
	}, function(err, result) {
		res.redirect('/');
	});
})


app.get('/updatePhil/:id', function(req, res) {
	console.log(req.params)
	db.collection('phil').findOne({_id: ObjectId(req.params.id)}, function(err, results){
    console.log(results)
    res.render('updatePhil', {phil: results})
  });
})



app.post('/phil/:id', function(req, res) {
	console.log(req.body)
	db.collection('phil').update(
		{_id: ObjectId(req.params.id)},
		{$set: {coffee: req.body.coffee}}, 
		function(err, result) {
			res.redirect('/');
		})
})






app.listen(process.env.PORT || 3000);