
var express = require('express');
var serveStatic = require('serve-static');

var app = express();
var port = process.env.PORT || 3000;

app.use(serveStatic('./public'));

app.get('*', function (req, res) {
  res.send('This is not the page you where looking for!');
});

app.listen(port, function () {
  console.log('server listening in port', port);
});
