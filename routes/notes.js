const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const {
    readFromFile,
    readAndAppend,
    writeToFile,
} = require('../helpers/fsUtils');
const { json } = require('express');

notes.get('/', (req, res) => {
    console.info(`${req.method} received request for notes`);
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

notes.get('/:note_id', (req, res) => {
    const notesId = req.params.note_id;
    readFromFile('./db/db.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
        const outcome = json.filter((note) => note.tip_id === tipId);
        return outcome.length > 0
        ? res.json(outcome)
        : res.json('There is no note with that ID');
    });
});

notes.delete('/:note_id', (req, res) => {
    const notesId = req.params.note_id;
    readFromFile('./db/db.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
      const outcome = json.filter((note) => note.id !== noteId);

      writeToFile('./db/db.json', result);

      res.json(`This note ${notesId} has been deleted`);
    });
});

notes.post('/', (req, res) => {
    console.log(req.body);

    const { title, text } = req.body;

    if (req.body) {
        const noteNew = {
            title,
            text,
            id: uuidv4(),
        };

        readAndAppend(noteNew, './db/db.json');
        res.json(`Added note successfully`);
    } else {
        res.error('Error occured when adding Note!');
    }
});

module.exports = notes;
