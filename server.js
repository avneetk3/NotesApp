// Dependencies
// =============================================================
const express = require("express");
const path = require("path");
const fs = require('fs');
const shortid = require("shortid"); // library for creating a unique id  source: Geeks for geeks

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));


// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
//to index.html
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});


//Route to notes.html
app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "public", "notes.html"));
});

// GET : Displays all Notes
// =============================================================

app.get("/api/notes", function(req, res) {
    
  fs.readFile("db/db.json", function(error,data) {
      if (error) {
        throw error;
      };
      let allNotes = JSON.parse(data);
      console.log(" In Get function /api/notes, server.js")
      return res.json(allNotes);
    });
 
});

// POST : Save NEW notes in db
// =============================================================

app.post('/api/notes', (req, res) => {
  
    fs.readFile("./db/db.json", function(error, data) {
      if (error) {
        throw error;
      };
      let allNotes = JSON.parse(data);

      console.log("in post function /api/notes, server.js");
      let newNote = {
        title: req.body.title,
        text: req.body.text,
        id: shortid.generate()
      }

      allNotes.push(newNote);
      
      fs.writeFile("./db/db.json", JSON.stringify(allNotes, null, 2), (error) => {
        if (error) {
          throw error;
        };
        res.send('200');
      });

    });

  });

  // GET : * redirect to index.html when link/* is used criteria 1, applied in end so that it does not take over other route directions
  app.get("*",  (req, res) => {
    console.log("in get * server.js");
     res.sendFile(path.join(__dirname, "public", "index.html"));
   });

// DELETE : Deletes the selected note from ID and render remaining notes
// =============================================================

app.delete('/api/notes/:id', (req, res) => {
  let selctedNote = req.params.id;

  fs.readFile("./db/db.json", function (err,data) {
    if (err) throw err;
    let allNotes = JSON.parse(data);
    
    function searchSelected(selctedNote, allNotes) {
      for (var i=0; i < allNotes.length; i++) {
          if (allNotes[i].id === selctedNote) {
              allNotes.splice(i, 1);  
          }
      }
    }

    searchSelected(selctedNote,allNotes);

    fs.writeFile("./db/db.json", JSON.stringify(allNotes, null, 2), (err) => {
      if (err) throw err;
      res.send('200');
    });

  });

});


// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT, " + PORT);
});
