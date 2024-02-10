const fs = require('fs')
const path = require('path')
const express = ('express')
const app = express()
const db = require('./db/db.json')

const PORT = process.env.PORT || 3000

// Creates id for each
const { v4 : uuidv4 } = require('uuid');


// Public folder access
app.use(express.static('public'))
app.use(express.json())

//  API ROUTES

// GET
app.get('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', (err, data) => { 
// 
        if(err) throw err;
        let baseData = JSON.parse(data);
        // responds with new data base
        res.json(baseData)

    });

})

// POST

app.post('/api.notes', (req, res) => {
    
    const newNote = req.body

    // Creates id in object with randomized id
    newNote.id = uuidv4()

    db.push(newNote)

    fs.writeFileSync('./db/db.json', JSON.stringify(db))

    res.json(db)

})

// DELETE
app.delete('/api/notes/:id', (req, res) => {
    const baseNew = db.filter((note) => note.id !== req.params.id)

    fs.writeFileSync('./db/db.json', JSON.stringify(baseNew))

    fs.readFile.json(baseNew)
})

// HTML ROUTES

// HOME
app.get('/', (req, res) => {
    res.sendFile(path.joing(__dirname, 'index.html'))
})
// NOTES
app.get('/notes', (req, res) => {
    res.sendFile(path.joing(__dirname, 'notes.html'))
})
// WILDCARD
app.get('*', (req, res) => {
    res.sendFile(path.joing(__dirname, 'index.html'))
})


// Listen.
app.listen(PORT, () =>
console.log(`App listening on ${PORT}`))
