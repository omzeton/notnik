const _MONGODB_URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-p7rod.mongodb.net/${process.env.MONGO_DATABASE}?retryWrites=true`;

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const router = require('./router/router.js');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use(router);

app.use((error, req, res) => {
    let newError;
    if (error.data) {
        newError = error.data[0];
    } else {
        newError = error;
    }
    const status = newError.statusCode || 500;
    const message = newError.msg;
    res.status(status).json({ message: message });
});

mongoose
    .connect(_MONGODB_URI, { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true })
    .then(() => {
        console.log('\x1b[33m', '✔ online');
        app.listen(3000);
    })
    .catch(err => {
        console.log('\x1b[31m', '❌ offline');
        console.log(err);
    });
