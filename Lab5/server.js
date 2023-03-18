const express = require('express');
const sequelize = require('./config/connectDB');
const bodyParser = require('body-parser');

const routerBlog = require('./router/blog');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
const port = 5555;


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
})
app.use(routerBlog);


sequelize
    .sync()
    .then(result => {
        app.listen(port, () => {
            console.log(`Ứng dụng đang chạy với port: ${port}`);
        })
    })
    .catch(err => {
        console.log(err);
    })
