

var express = require('express');
var serveStatic = require('serve-static');

var app = express();

app.use('/blog', serveStatic('./public'));

app.get('/:routeParameter', function (req, res) {
  res.send(req.params.routeParameter);
});

app.get('*', function (req, res) {
  res.send('this is not the page you where looking for!');
});

app.listen(3000, function () {
  console.log('server listening in port 3000');
});
