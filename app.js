const express = require('express');
const app = express();
const db = require('./models/database');

// dotenv
require('dotenv').config();

// Middleware to serve static files from the public folder
const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

// Set up Body Parser
app.use(express.json());

// Require routers
const usersRouter = require('./routes/usersRouter');

app.get('/', (req, res) => {
    res.send('Pagina inicial')
});

app.use('/user', usersRouter);

app.listen(process.env.SERVER, () => {
    console.log(`Server started on <http://localhost:${process.env.SERVER}>`);
})