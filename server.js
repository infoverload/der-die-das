
var express = require('express');
var serveStatic = require('serve-static');

var app = express();
var port = process.env.PORT || 8080;

app.use(serveStatic('./public'));

app.get('*', function (req, res) {
  res.send('This is not the page you were looking for!');
});

app.listen(port, function () {
  console.log('Server listening in port: ', port);
});
