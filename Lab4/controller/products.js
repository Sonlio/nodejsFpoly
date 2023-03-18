import Product from "../model/product";

const productsController =  {

    async getHome(req, res){
        const products = await Product.getAllProduct();
        res.render('shop', { 
            prods: products,
            pageTitle: "Home",
            path: "/",
            hasProducts: products.length > 0,
            activeShop: true
        })
    },

    async getProducts(req, res){
        const products = await Product.getAllProduct();
        res.render('listProduct', { 
            prods: products,
            hasProducts: products.length > 0,
        })
    },

    addProduct(req, res) {
        res.render('addProduct')
    },

    postAddProduct(req, res) {
        const nameProduct = req.body.nameProduct;
        const priceProduct = req.body.priceProduct;
        const description = req.body.description;
        const file = req.file;
        const fileName = file.filename;
        
        const products = {
            name: nameProduct,
            price: priceProduct,
            description: description,
            images: fileName
        }
        Product.addProduct(products);
        res.redirect('/')
    },

    async getProductById(req, res) {
        const idProd = req.params.idProd;
        const product = await Product.getProductById(idProd);
        res.render('detailProduct', { 
            prods: product
        })
    },

    async updateProduct(req, res) {
        const idProd = req.params.idProd;
        const product = await Product.getProductById(idProd);
        res.render('editProduct', {
            prod: product
        });
    },

    postUpdateProduct(req, res) {
        const idProd = req.params.idProd;
        const nameProduct = req.body.nameProduct;
        const priceProduct = req.body.priceProduct;
        const description = req.body.description;
        const file = req.file;
        const fileName = file.filename;
        
        const product = [nameProduct, priceProduct, description, fileName
        ]

        Product.updateProduct(idProd, product);

        res.redirect('/admin/list-product');
    },

    deleteProduct(req, res) {
        const idProd = req.params.idProd;
        Product.deleteProduct(idProd);

        res.redirect('/admin/list-product')
    }
}

export default productsController;