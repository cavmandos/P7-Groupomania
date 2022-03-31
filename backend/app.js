const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config({ path: './.env'})

app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(express.json());

const path = require("path");

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use((req, res, next) => {
    console.log('Requête reçue !');
    next();
  });

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/auth', require('./routes/auth'));
app.use('/posts', require('./routes/posts'));
app.use('/comments', require('./routes/comments'));

module.exports = app;