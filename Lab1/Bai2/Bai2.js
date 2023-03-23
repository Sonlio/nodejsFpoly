const express = require('express');
const app = express();
const port = 1112;

app.get('/', (req, res) => {
    res.send('<p>Đây là trang Home</p>')
})

app.get('/product', (req, res) => {
    res.send('<p>Đây là trang Product</p>')
})

app.get('/add-product', (req, res) => {
    res.send('<form action="/product" method="POST"><input type="text" name="productName"><button type="submit">Add Product</button></form>')
})

app.post('/product', (req, res, next) => {
    res.send('<p>Đã thực hiện thêm Product</p>');
});

app.listen(port, () => {
    console.log(`Ứng dụng đang chạy với port: ${port}`);
})