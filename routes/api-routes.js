/*
Was created to separate routing coden ot used any more
const express = require('express');
const app = express(); //set up express app
const path = require("path");
const fs = require('fs');

//required to create route from json file
// const notesData = require('../db/db.json');

//Set route to read from db.json file and return values from JSON file.


app.post("/api/notes", (req, res) => {
    let note2 = req.body;
    let totalNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    let noteLength = (totalNotes.length).toString();

    // to create id of the new note added, assign next number id of next node
    note2.id = noteLength;
    //push  note to the db.json abd update the file
    totalNotes.push(note2);
    fs.writeFileSync("./db/db.json", JSON.stringify(totalNotes));
    res.json(totalNotes);

    /* From boot camp
    const newNote = createNewNote(req.body, notes);
    res.json(newNote);*/
/*})

module.exports = app;*/