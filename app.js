/* eslint-disable indent, quotes */

const express = require('express');
const morgan = require('morgan');
// const cors = require('cors');

const app = express();
// app.use(cors());
const books = require('./play-store.js');

app.use(morgan('common')); // let's see what 'common' format looks like

app.get('/apps', (req, res) => {
    // ALL OUR CODE HERE
    const { genres, sort } = req.query;
    let results = books;
    if (sort) {
        if (!['Rating', 'App'].includes(sort)) {
            return res.status(400).send('Sort must be one of rating or app');
        }
    }
    if (genres) {
        if (!['action', 'puzzle', 'strategy', 'casual', 'arcade', 'card'].includes(genres)) {
            return res.status(400).send('Genre must be, Action, Puzzle, Strategy, Casual, Arcade or Card.');
        }
    }
    if (genres) {
        results = results.filter(app => app.Genres.toLowerCase().includes(genres.toLowerCase()));
    }
    if (sort) {
        if(sort === "App"){
            results.sort((a, b) => {
                return a[sort].toLowerCase() > b[sort].toLowerCase() ? 1 : a[sort].toLowerCase() < b[sort].toLowerCase() ? -1 : 0;
            });
        }else{
            results.sort((a, b) => {
                return a[sort] < b[sort] ? 1 : a[sort] > b[sort] ? -1 : 0;
            });
        }
    }
    //res.send('This is the app store!');
    res.send(results);
    //res.json(results);
});

module.exports = app;