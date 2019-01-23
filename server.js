var express = require("express");
var bodyParser = require("body-parser");
var mongodb = require("mongodb");
var ObjectID = mongodb.ObjectID;

var CLASS_COLLECTION = "todos";

var app = express();
app.use(bodyParser.json());

// Create a database variable outside of the database connection callback to reuse the connection pool in your app.
var db;

// Connect to the database before starting the application server.
mongodb.MongoClient.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/test", function (err, client) {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  // Save database object from the callback for reuse.
  db = client.db();
  console.log("Database connection ready");

  // Initialize the app.
  var server = app.listen(process.env.PORT || 8090, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
  });
});

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
    console.log("ERROR: " + reason);
    res.status(code || 500).json({"error": message});
  }
  
  /*  "/api/todos"
   *    GET: finds all todo
   *    POST: create a new todo
   */
  /*
  app.get("/api/todos", function(req, res) {
  });
  
  app.post("/api/todos", function(req, res) {
  });
  */


 app.get("/api/todos", function(req, res) {
    db.collection(TODOS_COLLECTION).find({}).toArray(function(err, docs) {
      if (err) {
        handleError(res, err.message, "Failed to get todos.");
      } else {
        res.status(200).json(docs);
      }
    });
  });
  
  app.post("/api/todos", function(req, res) {
    var newTodo = req.body;
    newTodo.createDate = new Date();
  
    if (!req.body.title) {
      handleError(res, "Invalid user input", "Must provide a title.", 400);
    } else {
      db.collection(TODOS_COLLECTION).insertOne(newTodo, function(err, doc) {
        if (err) {
          handleError(res, err.message, "Failed to create new todo.");
        } else {
          res.status(201).json(doc.ops[0]);
        }
      });
    }
  });



  /*  "/api/todos/:id"
   *    GET: find todo by id
   *    PUT: update todo by id
   *    DELETE: deletes todo by id
   */
  
  app.get("/api/todos/:id", function(req, res) {
  });
  
  app.put("/api/todos/:id", function(req, res) {
  });
  
  app.delete("/api/todos/:id", function(req, res) {
  });