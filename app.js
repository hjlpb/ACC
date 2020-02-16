var express = require('express');
var hbs = require('hbs');
var client = require('./routes/client');
var owner = require('./routes/owner');
var app = express();

//for access the stack files in the views directory, like jquery.js
app.use(express.static('views'));

//for parsing the post request body
var bodyParser = require("body-parser");   
app.use(bodyParser.urlencoded({ extended: false }));

app.set('view engine', 'hbs');  // 用hbs作为模版引擎
app.set('views', __dirname + '/views'); // 模版所在路径

app.use("/client", client);
app.use("/owner", owner);

app.listen(5555, function(){
    console.log('listen on port 5555');
})