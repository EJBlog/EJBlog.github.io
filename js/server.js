
// body-parser middleware which allows us to change the request or response before getting handled by our application
// This should always go before any C.R.U.D handlers
const express = require('express')
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.urlencoded({
  extended: true
}))

// displaying our page
app.get('/', (req, res) => {
  res.sendFile('C:/Users/Jacob/Documents/GitHub/EJBlog.github.io/_layouts/loggin.html')
  // Note: __dirname is directory that contains the JavaScript source code. Try logging it and see what you get!
  // Mine was '/Users/zellwk/Projects/demo-repos/crud-express-mongo' for this app.
});

// app.post('/userInfo', (req, res) => {
//   console.log(req.body)
// })

//// This is how I learned to connect to the mongodb but not how the tutorial is showing so commenting out
// // Connecting and sending data to the mongodb database
// var MongoClient = require('mongodb').MongoClient,
//   assert = require('assert');
//
// // Connection URL
// var url = 'mongodb://localhost:27017/test';
//
// // Use connect method to connect to the server
// MongoClient.connect(url, function(err, db) {
//   assert.equal(null, err);
//   console.log("Connected successfully to server");
//
//   // Insert a single document
//   db.collection('userInfo').insertOne({
//     a: 1,
//     "furstName": firstname,
//     "lastName": lastName,
//     "location": "Test Log-in Page"
//   }, function(err, r) {
//     assert.equal(null, err);
//     assert.equal(1, r.insertedCount);
//   });
//   db.close();
// });

// connecting and saving the user info into the mongodb
const MongoClient = require('mongodb').MongoClient
var db;

// This will connect to the mongo lab sandbox // MongoClient.connect('mongodb://<dbuser>:<dbpassword>@ds133311.mlab.com:33311/travel_map_editor', (err, database) => {
MongoClient.connect('mongodb://localhost:27017/test', (err, database) => {
  if (err) return console.log(err)
  db = database
  app.listen(3000, () => {
    console.log('listening on 3000')
  });
})

// This saves what was entered into the user name and password boxes
// app.post('/userInfo', (req, res) => {
//   db.collection('userInfo').save(req.body, (err, result) => {
//     if (err) return console.log(err)
//
//     console.log('saved to database')
//     res.redirect('/')
//   });
// });

// Getting user info
// app.get('/userInfo', (req, res) => {
//   db.collection('userInfo').find().toArray((err, result) => {
//     if (err) return console.log(err)
//
//     console.log('this worked');
//   });
// });

app.get('/userInfo', (req, res) => {
  var cursor = db.collection('userInfo').find()
})
