const fs = require('fs')
const path = require('path')
const express = ('express')
const app = express()
const db = require('./db/db.json')

const PORT = process.env.PORT || 3001

// Creates id for each
const { v4 : uuidv4 } = require('uuid');


// Public folder access
app.use(express.static('public'))
app.use(express.json())

//  API ROUTES

// GET

// POST

// DELETE


// HTML ROUTES

// HOME

// NOTES

// WILDCARD



// Listen.

