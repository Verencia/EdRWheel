const express = require('express');
const path = require('path');

var app = express();
    app.set("view options", {layout: false});
    app.use(express.static(__dirname + '/views'));
    app.use(express.static(path.join(__dirname, 'public')));
const port = process.env.PORT || 8080;

// sendFile will go here
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/views/wheeloluck.html'));
});

app.listen(port);
console.log('Server started at http://localhost:' + port);
