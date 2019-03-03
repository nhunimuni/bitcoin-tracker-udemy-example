//jshint esversion:6

const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

var app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));


app.get("/", function(req, res) {
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/", function(req, res){
  var crypto = req.body.crypto;
  var fiat = req.body.fiat;
  var amount = req.body.amount;

  var options = {
    url: "https://apiv2.bitcoinaverage.com/convert/global",
    method: "GET",
    qs: {
      from: crypto,
      to: fiat,
      amount: amount
    }
  };

  request(options, function(error, response, body){
    var data = JSON.parse(body);
    var price = data.price;
    res.write("<p>Hi</p>");
    res.write("<h1>" + amount + crypto + " is currently worth " + price + fiat +"</h1>");
    res.send();
  });
});

app.listen(3000, function() {
  console.log("Server is listening on port 3000.");
});
