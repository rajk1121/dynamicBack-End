const http = require('http');
const fs = require("fs");
var productb = fs.readFileSync("./templates/product-t.html");
var cardb = fs.readFileSync("./templates/card-t.html");
var overviewb = fs.readFileSync("./templates/overview-t.html");
const jsond = require("./json/data.json");
const express = require('express');
const app = express();
app.get(['/', '/overview', '/home'], function (req, res) {
    var overview = "" + overviewb;
    var card = "" + cardb;

    var ans = "";
    for (var i = 0; i < jsond.length; i++) {
        var x = card.replace(/{%IMAGES%}/g, jsond[i].image);

        x = x.replace(/{%PRODUCT-NAME%}/g, jsond[i].productName);

        x = x.replace(/{%ID%}/g, jsond[i].id);

        if (!jsond[i].organic)
            x = x.replace(/{%NOT-ORGANIC%}/g, 'not-organic');

        x = x.replace(/{%QTY%}/g, jsond[i].quantity);

        x = x.replace(/{%PRICE%}/g, jsond[i].price);
        ans = ans + x;

    }
    overview = overview.replace(/{%CARD_CARDS%}/, ans)
    res.status(200).send(overview);


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
    var x = product.replace(/{%IMAGES%}/g, jsond[id].image);
    x = x.replace(/{%FROM%}/g, jsond[id].from);
    x = x.replace(/{%NUTRIENTS%}/g, jsond[id].nutrients);
    x = x.replace(/{%DESCRIPTION%}/g, jsond[id].description);
    x = x.replace(/{%PRODUCT-NAME%}/g, jsond[id].productName);

    if (!jsond[id].organic)
        x = x.replace(/{%NOT-ORGANIC%}/g, 'not-organic');


    x = x.replace(/{%QTY%}/g, jsond[id].quantity);

    x = x.replace(/{%PRICE%}/g, jsond[id].price);
    ans = ans + x;
    res.status(200).html.send(ans);



})
app.get('/api', function (req, res) {
    var url = req.url;
    var arr = url.split("?");
    if (arr.length === 1) {
        // res.writeHead(200, { "content-type": "application/jsond" });
        res.send(jsond);
    } else {
        var n = arr[1];
        var arrn = n.split("");
        arrn.shift();
        arrn.shift();
        n = arrn.join("");
        console.log(n);
        var id = +n;
        // res.writeHead(200, { "content-type": "application/JSON" });
        res.status(200).json.send(jsond[id]);

    }
});
app.get("*", function (req, res) {
    res.status(404).send("404 Not Found");
})
var port = process.env.PORT || 80;
app.listen(port);