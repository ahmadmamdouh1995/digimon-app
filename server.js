'use stric';

require('dotenv').config();

const express = require('express');
const superagent = require('superagent');
const { Client } = require('pg');
const methodOverRide = require('method-override');


const PORT = process.env.PORT || 4000;
const app = express();

const client = new Client(process.env.DATABASE_URL);

client.connect().then(() => {
    console.log(`the server is up and running on ${PORT}`);
});


app.use(express.urlencoded({ extended: true }));
app.use(methodOverRide('_method'));
app.use(express.static('./public'));
app.set('view engine', 'ejs');

app.get('/', homePage);
app.get('/favorit', addFavourit);
app.get('/details', showDetails);

app.get('*', notFoundHandler);





function homePage(req, res) {
    const url = 'https://digimon-api.herokuapp.com/api/digimon'
    superagent.post(url).then((result) => {
        const digmon = req.body.result;

        const dog = new Digmon(dig);
        
        res.render('index', { all : digmon }) 

    }).catch((err) => errorHandler(err, req, res));
}

function addFavourit(req, res) {

}

function showDetails(req, res) {

}



function Digmon(dig) {
    this.name = dig.name;
    this.img = dig.img;
    this.level = dig.level;
}

function notFoundHandler(req, res) {
    res.status(404).send('Not Found !');
}

function errorHandler(err, req, res) {
    res.status(500).send('error', err);
}

