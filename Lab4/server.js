import express from 'express';
import viewEngine from './config/viewEngine';
import routerShop from './router/shop';
import routerAmin from './router/admin';

const app = express();
const port = 4444;

viewEngine(app);

app.use(routerShop);
app.use(routerAmin);

app.listen(port, () => {
    console.log(`Ứng dụng đang chạy vơi port: ${port}`);
})