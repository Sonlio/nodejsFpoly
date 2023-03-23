const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const router = require('./router/routerRegister');

const port = 7777;

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(router);

mongoose.connect("mongodb://127.0.0.1:27017/lab7").then(result => {
    app.listen(port, () => console.log(`Ứng dụng đang chạy với port: ${port}`))
})
.catch(err => console.log(err))
