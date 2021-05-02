const express = require('express');
const fs = require("fs");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3001;
const { notes } = require("./db/db.json")

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("/api/notes", (req, res) => {
    let input = JSON.parse(fs.readFileSync("./db/db.json", "utf8"))
    res.json(input);
});

app.post('/api/notes', (req, res) => {
    req.body.id = notes.length.toString();
    const note = createNewNote(req.body, notes)
    res.json(note)
});

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"))
 });

function createNewNote (body, notesArray) {
    const note = body;
    notesArray.push(note);
    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify({ notes: notesArray}, null, 2)
    )
    return note;
}


 app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});

//test text       {"title":"Test Title2","text":"Test text2","id":"1"}