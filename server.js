
const fs = require('fs');
const path = require('path');
const notes = require('./db/db');

const express = require('express');
const PORT = process.env.PORT || 3003;

const app = express();
app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

function loadNotes() {
    
    let noteDB = fs.readFileSync('./db/db.json');
    return JSON.parse(noteDB);
};

// gets json file 
app.get('/api/notes', (req, res) => {
    const noteData = loadNotes()
    res.json(noteData);
});
 
// brings up html pages that display on the website
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'))
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
  });

app.post('/api/notes', (req, res) => {
    let note = req.body;
    note.id = Date.now();
    let noteInfo = fs.readFileSync('./db/db.json');
    let parsedNoteInfo = JSON.parse(noteInfo); 
    parsedNoteInfo.push(note);

    fs.writeFile(__dirname + "/db/db.json", JSON.stringify(parsedNoteInfo), (err, data) => {
        if (err) throw err;
        res.json(parsedNoteInfo)  
      }); 
})

app.delete('/api/notes/:noteId', (req, res) => {
let notes = loadNotes();
notes = notes.filter((x) => {
    return parseInt(x.id) != parseInt(req.params.noteId)
})

fs.writeFile(__dirname + "/db/db.json", JSON.stringify(notes), (err, data) => {
    if (err) throw err;
    res.json(notes) 
  }); 
});

// port
app.listen(PORT, () => {
    console.log(`Server is on port ${PORT}!`);
});
