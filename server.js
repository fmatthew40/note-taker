
const fs = require('fs');
const path = require('path');
const notes = require('./db/db');

const express = require('express');
const PORT = process.env.PORT || 3003;

const app = express();
app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

function loadNote() {
    // fs.readFileSync('./db/db.json');
//     var content;
// fs.readFile('db/db.json', function read(err, data) {
//     if (err) {
//         throw err;
//     }
//     content = data;
// });
// console.log(content);
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
  });
    };

// gets json file 
app.get('/api/notes', (req, res) => {
    res.json(notes);
});
 
// brings up html pages that display on the website
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'))
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
  });

app.post('/api/notes', (req, res) => {
    let addId = req.body;
    addId.id = Date.now();
    let noteInfo = fs.readFileSync('./db/db.json');
    let parsedNoteInfo = JSON.parse(noteInfo); 
    parsedNoteInfo.push(req.body);

    fs.writeFile(__dirname + "/db/db.json", JSON.stringify(parsedNoteInfo), (err, data) => {
        if (err) throw err;
        res.json(parsedNoteInfo)  

        loadNote();
      }); 
})

// port
app.listen(PORT, () => {
    console.log(`Server is on port ${PORT}!`);
});







