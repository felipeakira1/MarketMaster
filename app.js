const express = require('express');
const app = express();

// dotenv
require('dotenv').config();

app.get('/', (req, res) => {
    res.send("Ola") ;
})

app.listen(process.env.SERVER, () => {
    console.log(`Server started on <http://localhost:${process.env.SERVER}>`);
})