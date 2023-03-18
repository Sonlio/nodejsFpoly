const express = require('express');
const bodyParser = require("body-parser");
const routerPost = require('./router/routepost');

const app = express();
const port = 8881;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/blog", routerPost);


app.listen(port, () => {
    console.log(`Ứng dụng đang chạy với port: ${port}`);
})