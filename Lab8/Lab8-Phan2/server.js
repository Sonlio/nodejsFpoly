const express = require('express');
const bodyParser = require('body-parser');
const router = require('./router/postRouter');
const mongoose = require('mongoose');

const app = express();
const port = 8882;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(router);

mongoose.connect("mongodb+srv://levansonsvqb:WJ03EUD88hNaSBk3@cluster0.rimqzvh.mongodb.net/lab8")
    .then(result => {
        app.listen(port, () => {
            console.log(`Ứng dụng đang chạy với port: ${port}`);
        })
    })
    .catch(err => {
        console.log(err);
    })