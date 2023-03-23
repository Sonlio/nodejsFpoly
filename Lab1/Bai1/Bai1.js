const express = require('express');
const app = express();
const port = 1111;

app.get('/', (req, res, next) => {
    res.send('<h1>Hello</h1>')
})

app.listen(port, () => {
    console.log(`Ứng dụng đang chạy với port: ${port}`);
})