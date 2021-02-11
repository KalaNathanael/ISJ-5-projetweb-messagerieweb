// import express from "express";
// import bodyParser from "body-parser";
// import mongoose from "mongoose";
// import route from "./routes/routes";
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const route=require('./routes/routes');



mongoose.connect('mongodb+srv://admin:admin99@cluster0.rr3e3.mongodb.net/test?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });
  // il d'acceder au corps d'une requete sous forme de json

  app.use(bodyParser.json());

  // lancement de toutes les routes

  app.use('/api/',route); 

module.exports = app;