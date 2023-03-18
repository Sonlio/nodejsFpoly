const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 2222;
app.use(bodyParser.urlencoded());

// Khai báo sử dụng ejs
app.set("view engine", "ejs");
app.set("views", "./src/views");
app.use(express.static("./src/public"))

// Khai báo multer
const multer = require('multer');

// Data
const listProduct = [
    {
        id: 0101,
        title:'Apple Book',
        price:3000,
        description:"A very interesting book about so many even more interesting things!",
        imageURL:"book1.jpg",
    },
    {
        id: 0102,
        title:'Microsoft Book',
        price:2000,
        description:"A very interesting book about so many even more interesting things!",
        imageURL:"book2.jpg",
    },
    {
        id: 0103,
        title:'VFast Book',
        price:1000,
        description:"A very interesting book about so many even more interesting things!",
        imageURL:"book3.jpg",
    } 
];


app.get("/", (req, res)=>{
    var today=new Date();
    currentDay=today.getDay();
    var day='';

    switch(currentDay){
    case 0:
        day='Chủ nhật';
        break;
    case 1:
        day = 'Thứ hai';
        break;
    case 2:
        day = 'Thứ ba';
        break;
    case 3:
        day = 'Thứ tư';
        break;
    case 4:
        day = 'Thứ năm';
        break;
    case 5:
        day = 'Thứ sáu';
        break;
    case 6:
        day = 'Thứ bảy';
        break;
    default:
        console.log(`Error: ${currentDay}`);
    }
        res.render('home',{kindOfDay:day});
}) 
   
app.get('/shop', (req, res) => {
    res.render('shop', {products: listProduct})
})

app.get('/addproduct', (req, res) => {
    res.render('addProduct');
})

// SET STORAGE
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './src/public/images')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now()+'-'+file.originalname )
    }
})

const upload = multer({storage: storage});

app.post('/addproduct', upload.single('image'), (req, res) => {
    const file = req.file;
    const title = req.body.name;
    const price = req.body.price;
    const description = req.body.description;
    const nameImg = file.filename;

    listProduct.push({
        id: 1010,
        title: title,
        price: price,
        description: description,
        imageURL: nameImg
    })

    res.redirect('/shop');
})

app.get('/detail/:id', (req, res) => {
    const id = req.params.id;
    const filterProduct = listProduct.find(item => item.id == id);
    console.log(filterProduct);
    res.render('detail', {filterProduct: filterProduct})
})

app.listen(port, () => {
    console.log(`Ứng dụng đang chạy với port: ${port}`);
})