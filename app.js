// to import the Express package
const express = require('express');

// to create an Express application
const app = express();

app.use((req, res, next) => {
    console.log('Requête reçue !');
    next();
});

app.use((req, res, next) => {
    res.status(201);
    next(); 
});

app.use((req, res, next) => {
    res.json({ message: 'Votre requête a bien été reçue !' });
next();
});

app.use((req, res) => {
console.log('Réponse envoyée avec succès !');
});

// to export this app to access it from the other files and specially the server Node
module.exports = app;