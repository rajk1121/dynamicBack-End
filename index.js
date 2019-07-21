const http = require('http');
const fs = require("fs");
var productb = fs.readFileSync("./templates/product-t.html");
var cardb = fs.readFileSync("./templates/card-t.html");
var overviewb = fs.readFileSync("./templates/overview-t.html");
const json = require("./json/data.json");
const express = require('express');
const app = express();
app.get(['/', '/overview', '/home'], function (req, res) {
    var overview = "" + overviewb;
    var card = "" + cardb;

    var ans = "";
    for (var i = 0; i < json.length; i++) {
        var x = card.replace(/{%IMAGES%}/g, json[i].image);

        x = x.replace(/{%PRODUCT-NAME%}/g, json[i].productName);

        x = x.replace(/{%ID%}/g, json[i].id);

        if (!json[i].organic)
            x = x.replace(/{%NOT-ORGANIC%}/g, 'not-organic');

        x = x.replace(/{%QTY%}/g, json[i].quantity);

        x = x.replace(/{%PRICE%}/g, json[i].price);
        ans = ans + x;

    }
    overview = overview.replace(/{%CARD_CARDS%}/, ans)
    res.send(overview);


})
app.get('/products', function (req, res) {
    var url = req.url;
    var arr = url.split("?");
    var n = arr[1];
    var arrn = n.split("");
    arrn.shift();
    arrn.shift();
    n = arrn.join("");
    console.log(n);
    var id = +n;
    var product = "" + productb;
    var ans = "";
    var x = product.replace(/{%IMAGES%}/g, json[id].image);
    x = x.replace(/{%FROM%}/g, json[id].from);
    x = x.replace(/{%NUTRIENTS%}/g, json[id].nutrients);
    x = x.replace(/{%DESCRIPTION%}/g, json[id].description);
    x = x.replace(/{%PRODUCT-NAME%}/g, json[id].productName);

    if (!json[id].organic)
        x = x.replace(/{%NOT-ORGANIC%}/g, 'not-organic');


    x = x.replace(/{%QTY%}/g, json[id].quantity);

    x = x.replace(/{%PRICE%}/g, json[id].price);
    ans = ans + x;
    res.send(ans);



})
app.get('/api', function (req, res) {
    var url = req.url;
    var arr = url.split("?");
    if (arr.length === 1) {
        // res.writeHead(200, { "content-type": "application/JSON" });
        res.send(json);
    } else {
        var n = arr[1];
        var arrn = n.split("");
        arrn.shift();
        arrn.shift();
        n = arrn.join("");
        console.log(n);
        var id = +n;
        // res.writeHead(200, { "content-type": "application/JSON" });
        res.send(json[id]);

    }
});
var port = process.env.port || 80;
app.listen(port);