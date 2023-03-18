import express from "express";
import bodyParser from "body-parser";

const viewEngine = (app) => {
    app.use(express.static('./public'));
    app.set('view engine', 'ejs');
    app.set('views', './views');
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
}

export default viewEngine;