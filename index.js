const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose');

//Conecta bd mongo
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/restapis',{
    useNewUrlParser:true
})
//Crea servidor
const app = express();
// Habilita bodyparser
app.use(express.json());
app.use(express.urlencoded({extended: true}));
//Rutas de la app
app.use('/',routes());
//Define puerto
app.listen(5000);