// Dependencies
const express = require('express');
const fs = require('fs');
const path = require("path");
const app = express();
const PORT = process.env.PORT||3000;

let dataBase = [];

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static(path.join(__dirname, '/public')))

fs.readFile('db/db.json', 'utf8', (err,data) => {
    if(err) throw err;
    dataBase = JSON.parse(data)
});

// Routes
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, 'notes.html')));

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));

// get database
app.get('/api/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'db/db.json'))
});

app.post('/api/notes', (req, res) => {
    const userNotes = req.body;
    dataBase.push(userNotes);
    res.json(userNotes);   

    dataBase.forEach((note, index) => {
        note.id = index;
        return dataBase;
      });
      console.log(dataBase)

    fs.writeFile('db/db.json', JSON.stringify(dataBase), (err,data) => {
        if(err) throw err; 
    });
});

app.delete('/api/notes/:id', (req,res) => {
    dataBase = dataBase.filter( note => note.id != req.params.id)

    fs.writeFile('db/db.json', JSON.stringify(dataBase), (err,data) => {
        if(err) throw err; 
    });

    res.sendFile(path.join(__dirname, 'db/db.json'))
});


// Listener
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
