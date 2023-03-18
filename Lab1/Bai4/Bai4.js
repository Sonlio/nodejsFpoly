const express = require('express');
const app = express();
const bodyParse = require('body-parser');
const port = 1904;
app.use(bodyParse.urlencoded());

const inventors = [
    { id:1, first: 'Albert', last: 'Einstein', year: 1879, passed: 1955 },
    { id:2, first: 'Isaac', last: 'Newton', year: 1643, passed: 1727 },
    { id:3, first: 'Galileo', last: 'Galilei', year: 1564, passed: 1642 },
    { id:4, first: 'Marie', last: 'Curie', year: 1867, passed: 1934 },
    { id:5, first: 'Johannes', last: 'Kepler', year: 1571, passed: 1630 },
    { id:6, first: 'Nicolaus', last: 'Copernicus', year: 1473, passed: 1543 }
];

app.get('/inventor', (req, res) => {
    let list = '<h2>Danh sách nhà khoa học</h2><ul>'
    inventors.forEach(item => {
        list += `<li><a style="color: green; text-decoration: none;"; href="/inventor/${item.id}">${item.last}</a></li>`
    })
    list+= '</ul>';
    res.send(list);
})

app.get('/inventor/:id', (req, res) => {
    const id = req.params.id;
    const findPerson = inventors.find(item => item.id == id);
    res.send(`
        <h3>Thông tin chi tiết nhà khoa học: 
        Full name: ${findPerson.first} ${findPerson.last}, 
        Year: ${findPerson.year}, 
        Passed: ${findPerson.passed}</h3>`
    );
})

app.get('/add-inventor', (req, res) => {
    res.send('<h1>Thêm Nhà Khoa Học</h1><form action="/inventor" method="POST"><input type="text" name="first" placeholder="input first name"><input type="text" name="last" placeholder="input last name"><br><input type="number" name="year" placeholder="Year"><input type="number" name="passed" placeholder="passed"><br><button type="submit">Add Product</button></form>');
})

app.post('/inventor', (req, res) => {
    let newInventor = req.body;
    newInventor.id = inventors.length+1;
    inventors.push(newInventor);
    res.redirect('/inventor');
})

app.listen(port, () => {
    console.log('Ok');
})