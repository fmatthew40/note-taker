const express = require('express');
const PORT = process.env.PORT || 3003;
const app = express();


const notes = require('./db/db.json');
// const db = require('./db/db');




// function queryFilter(query, noteArray) {
//     let queries = noteArray;
//     if (query.text) {
//         queries = queries.filter(note => note.text === query.text);
//     }
//     if (query.title) {
//         queries = queries.filter(note => note.title === query.title);
//     }
//     return queries; 
// }

// app.get('/api/notes', (req, res) => {
//     let input = notes;
//     if (req.query) {
//         input = queryFilter(req.query, input);
//     }
//     res.json(input);
//   });


app.get('/api/notes', (req, res) => {
    res.json(notes);
});

app.listen(PORT, () =>{
    console.log(`API server is on port ${PORT}!`);
});