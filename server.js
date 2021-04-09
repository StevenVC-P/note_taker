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
    let number = 1;
    dataBase.forEach((note, index) => {
      note.id = number;
      number++;
      return dataBase;
    });

    console.log(dataBase)
    const userNotes = req.body;
    dataBase.push(userNotes);
    res.json(userNotes);
    

    fs.writeFile('db/db.json', JSON.stringify(dataBase), (err,data) => {
        if(err) throw err; 
    });
});

// Listener
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
