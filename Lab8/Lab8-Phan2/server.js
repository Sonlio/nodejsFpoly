const express = require('express');
const bodyParser = require('body-parser');
const router = require('./router/postRouter');
const mongoose = require('mongoose');

const app = express();
const port = 8882;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(router);

mongoose.connect("mongodb://127.0.0.1:27017/lab8")
    .then(result => {
        app.listen(port, () => {
            console.log(`Ứng dụng đang chạy với port: ${port}`);
        })
    })
    .catch(err => {
        console.log(err);
    })