import db from "../config/connectDB";

class Product {
    constructor() {}

    // Thêm sản phẩm mới
    static addProduct(product) {
        const sql = "INSERT INTO products SET ?";
        db.query(sql, product, (err, data) => {
            if(err) throw err;
            return true;
        })
    }

    static getAllProduct() {
        const sql = "SELECT * FROM products";
        return new Promise((resolve, reject) => {
            db.query(sql, (err, data) => {
                if(err) throw err;
                resolve(data);
            })
        })
    }

    static getProductById(id) {
        const sql = `SELECT * FROM products WHERE id=${id}`
        return new Promise((resolve, reject) => {
            db.query(sql, (err, data) => {
                if(err) throw err;
                resolve(data);
            })
        })
    }

    static updateProduct(id, product) {
        const sql = `UPDATE products SET name = ?, price = ?, description = ?, images =? WHERE id=${id}`
        return new Promise((resolve, reject) => {
            db.query(sql, product, (err, data) => {
                if(err) throw err;
                resolve(data);
            })
        })
    }

    static deleteProduct(id) {
        const sql = `DELETE FROM products WHERE id=${id}`
        db.query(sql, (err, data) => {
            if(err) throw err;
        })
    }
}

export default Product;