/**
 * Created by zmouse on 2017/6/16.
 * E-mail: zmouse@miaov.com
 * GitHub: zmouse@github.com
 */

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

const userRouter = require('./controllers/api/User');
const ShopTypeRouter = require('./controllers/api/ShopType');
const ShopRouter = require('./controllers/api/Shop');

const shopTypeRouter = require('./controllers/admin/ShopType');
const shopRouter = require('./controllers/admin/Shop');
const goodsRouter = require('./controllers/admin/Goods');

app.use('/public', express.static('./public'));

app.use( bodyParser.urlencoded({extended: true}) );
app.use(cookieParser());

mongoose.connect('mongodb://127.0.0.1/app');

app.use('/', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
});

app.use((req, res, next) => {
    req.userInfo = {};
    if (req.cookies && req.cookies.userinfo) {
        req.userInfo = JSON.parse(req.cookies.userinfo);
    }
    next();
});

app.use('/api/user', userRouter);
app.use('/api/shoptype', shopTypeRouter);
app.use('/api/shop', ShopRouter);

app.use('/admin/shoptype', shopTypeRouter);
app.use('/admin/shop', shopRouter);
app.use('/admin/goods', goodsRouter);

app.listen(8888, function () {
    console.log('服务器启动成功');
});
