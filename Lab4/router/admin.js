import express from "express";
import productsController from "../controller/products";
import multer from "multer";

const routerAmin = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/images');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
})

const upload = multer({storage: storage});

routerAmin.get('/admin/add-product', productsController.addProduct);
routerAmin.post('/admin/add-product', (upload.single("image")), productsController.postAddProduct);
routerAmin.get('/product/:idProd', productsController.getProductById);
routerAmin.get('/admin/list-product', productsController.getProducts);
routerAmin.get('/admin/edit/:idProd', productsController.updateProduct);
routerAmin.post('/admin/edit/:idProd', (upload.single("image")), productsController.postUpdateProduct);
routerAmin.get('/admin/delete/:idProd', productsController.deleteProduct);

export default routerAmin;
