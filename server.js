
// 1. connect and create a web server
// 2.  get data
// 3.  allow users to enter data - post data
// 4. connect html webpage
// 5.  connect save feature
// 6.  add ids
// 7.  delete function

const express = require('express');
const PORT = process.env.PORT || 3003;
var app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const notes = require('./db/db.json');


// remove
// function queries(query, notesArray) {
//     let queryResults = notesArray;

//     if (query.title) {
//         queryResults = queryResults.filter(note => note.title === query.title);
//       }
//     if (query.text) {
//         queryResults = queryResults.filter(note => note.text === query.text);
//       }
//     return queryResults; 

// }

// remove this 
// app.get('/api/notes', (req, res) => {
//     let results = notes;
//     if (req.query) {
//         results = queries(req.query, results); 
//     }
//     res.json(results); 
// });

// remove
function getArray(req, notesArray) {
    const notesArr = notesArray.filter(note => note.text )
    return notesArr; 
}


app.get('/api/notes', (req, res) => {
    res.json(notes);
})
// remove
app.get('/api/notes/:id', (req, res) => {
    const result = getArray(req.params, notes);
      res.json(result);
  });

app.post('/api/notes',(req, res) => {
    console.log(req.body); 
    res.json(req.body);
});

app.listen(PORT, () => {
    console.log(`API server is on port ${PORT}!`);
});