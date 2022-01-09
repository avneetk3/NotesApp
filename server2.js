//Adding dependencies
const express = require('express');
const path = require("path");
const fs = require('fs');

// Set up Express App
const app = express(); //set up express app

// Set up port for listening 8080 by default else decided by Heroku
const PORT = process.env.PORT || 8000;

//middle ware Express App
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

//parsing incoming JSON
//parse icoming strign or array data
// app.use(express.static('public'));

// app.use('/api', apiRoutes)

// app.use('/', htmlRoutes)

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname,"public", "index.html"));
});

//should receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client. 

app.get("/notes", (req, res) => {

  //let results = notesData;
  //console.log(req.query);
  //res.json(results);
  res.sendFile(path.join(__dirname,"public" , "notes.html"));
  
});

//Set route to main page: index.html , wild card route

app.get("/api/notes", (req, res) => {
  // console.log(req)
  // console.log(res)
  //res.sendFile(path.join(__dirname, "./db/db.json"));
  //res.json(notesData)
  fs.readFile('db/db.json', function (err, data){
      if (err){
          throw err;
      }
      let notesData = JSON.parse(data);
      console.log(notesData)
      return res.json(notesData);

  })
});

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "./public/index.html"));
// });

//listen to port 8000 or as set bu Heroku
app.listen(PORT, () => {
    console.log(`API server now on port `+ PORT+ `!`);
  });




