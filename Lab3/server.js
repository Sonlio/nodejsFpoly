const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const mysql = require('mysql');

const app = express();
app.use(bodyParser.urlencoded());
const port = 3333;

// Khai báo sử dụng ejs, public, multer
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('./public'))

// Kết nối database
const db = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    database : 'book',
    multipleStatements: true
  });

// ***** SHOW ALL PRODUCTS *****
app.get("/", (req,res)=>{
    const sql = 'SELECT * FROM catalog;SELECT * FROM products'
    db.query(sql, (err, data) => {
        if (err) {
            throw err;
        }
        res.render('shop', {categories:data[0], products: data[1]});
    })
})

// ***** SELECT PRODUCT BY CATEGORY *****
app.get("/shop/:cateId", (req,res)=>{
    const id = req.params.cateId;
    const sql = `SELECT * FROM products WHERE idCategory=${id};SELECT * FROM catalog`
    db.query(sql, (err, data) => {
        if (err) {
            throw err;
        }
        res.render('shop', {categories:data[1], products: data[0]});
    })
})

// ***** ADMIN *****

// ***** UPLOAD IMAGES *****
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/images');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
})

const upload = multer({storage: storage});

// ***** INSERT *****
app.get("/admin", (req,res)=>{
    res.render('admin/home');
})

app.get("/admin/addnew", (req,res)=>{
    const sql = 'SELECT * FROM catalog;'
    db.query(sql, (err, data) => {
        if (err) {
            throw err;
        }
        res.render('admin/addnew', {categories:data});
    })
})

app.post("/admin/addnew",(upload.single('images')), (req, res) => {
    const idCategory = req.body.idCategory;
    const nameProduct = req.body.nameProduct;
    const priceProduct = req.body.priceProduct;
    const authorProduct = req.body.authorProduct;
    const sortDescription = req.body.sortDescription;
    const description = req.body.description;
    const file = req.file;
    const fileName = file.filename;

    const insertProduct = {
        nameProduct: nameProduct,
        priceProduct: priceProduct,
        authorProduct: authorProduct,
        sortDescription: sortDescription,
        description: description,
        images: fileName,
        idCategory: idCategory
    }
    db.query("INSERT INTO products SET ?", insertProduct, (err, data) => {
        if(err) throw err;
        res.redirect('/');
    })
})

// ***** PRODUCTS MANAGEMENT *****
app.get("/admin/list", (req,res)=>{
    const sql = 'SELECT * FROM products'
    db.query(sql, (err, data) => {
        if (err) {
            throw err;
        }
        res.render('admin/list', {products: data});
    })
})

// ***** EDIT *****
let prodId;
app.get("/admin/edit/:prodId", (req,res)=>{
    prodId = req.params.prodId;
    const sql = `SELECT * FROM catalog;SELECT * FROM products WHERE idProduct=${prodId}`
    db.query(sql, (err, data) => {
        if (err) {
            throw err;
        }
        res.render('admin/edit', {categories:data[0], products: data[1]});
    })
})

app.post("/admin/edit/",(upload.single('images')), (req, res) => {
    const idCategory = req.body.idCategory;
    const nameProduct = req.body.nameProduct;
    const priceProduct = req.body.priceProduct;
    const authorProduct = req.body.authorProduct;
    const sortDescription = req.body.sortDescription;
    const description = req.body.description;
    const file = req.file;
    const fileName = file.filename;

    db.query("UPDATE products SET nameProduct = ?, priceProduct = ?, authorProduct = ?, sortDescription = ? , description = ?, images = ?, idCategory = ? WHERE idProduct = ?", [nameProduct, priceProduct, authorProduct, sortDescription, description, fileName, idCategory, prodId], (err, data) => {
        if(err) throw err;
        res.redirect('list');
    })
})

// ***** DELETE *****
app.get("/admin/delete/:prodId", (req, res) => {
    const prodId = req.params.prodId;
    const sql = `DELETE FROM products WHERE idProduct=${prodId}`
    db.query(sql, (err, data) => {
        if(err) throw err;
        res.redirect('/admin/list');
    })
})

app.listen(port, () => {
    console.log(`Ứng dụng đang chạy với port: ${port}`);
})