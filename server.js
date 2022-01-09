const express = require('express');
const PORT = process.env.PORT || 3003;
const app = express();


const notes = require('./db/db.json');
// const db = require('./db/db');






app.get('/api/notes', (req, res) => {
    res.json(notes);
});

app.listen(3003, () =>{
    console.log(`API server is on port ${PORT}!`);
});