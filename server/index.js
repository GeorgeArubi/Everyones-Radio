// MERN = Mongo + Express + React + Node

// Development = Node.js server + React server

const express = require('express');
const app = express();

app.get('/hello', (req, res) => {
    res.send('hello world')
})

app.listen(1337, () => {
    console.log('listening on port 1337') 
})