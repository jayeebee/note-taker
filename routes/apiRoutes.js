const fs = require("fs");
const path = require("path");
const router = require('express').Router();
const { notes } = require("../db/db.json");


router.get("/notes", (req, res) => {
    let input = JSON.parse(fs.readFileSync("./db/db.json", "utf8"))
    res.json(input);
});

router.post('/notes', (req, res) => {
    req.body.id = notes.length.toString();
    const note = createNewNote(req.body, notes)
    res.json(note)
});


function createNewNote (body, notesArray) {
    const note = body;
    notesArray.push(note);
    fs.writeFileSync(
        path.join(__dirname, '../db/db.json'),
        JSON.stringify({ notes: notesArray}, null, 2)
    )
    return note;
}

module.exports = router;