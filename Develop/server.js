const fs = require('fs')
const path = require('path')
const express = require('express')
const app = express()


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

app.post('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        const newNote = req.body
        console.log(newNote)
        // Creates id in object with randomized id
        newNote.id = uuidv4()
    
        data = JSON.parse(data)
        data.push(newNote)
    
        fs.writeFileSync('./db/db.json', JSON.stringify(data))
    
        res.json(data)
    })


    

})

// DELETE
app.delete('/api/notes/:id', (req, res) => { 
    fs.readFile('./db/db.json', 'utf8', (err, data) => { console.log(data)
    const baseNew = JSON.parse(data).filter((note) => note.id !== req.params.id)
    const sync = fs.writeFileSync(path.join(process.cwd(), '/db/db.json'), JSON.stringify(baseNew), 'utf8')
    res.json(200)
    });
})

// HTML ROUTES

// HOME
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'))
})
// NOTES
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'))
})
// WILDCARD
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'))
})


// Listen.
app.listen(PORT, () =>
console.log(`App listening on http://localhost:${PORT}`))
 