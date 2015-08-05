var express = require('express');
var app = express();
var spawn = require('child_process').spawn;
var available = false;

var cmd = spawn('cat', [ '/dev/cu.usbmodem1411' ]);

cmd.stdout.on('data', function (data) {
  var res = data.toString().trim();
  if (res.length) {
    available = !!res.match(/1/)
    console.log(available);
  }
});

cmd.on('close', function (data) {
});

app.get('/', function (req, res) {
  res.redirect('/status');
});
app.get('/status', function (req, res) {
  var html = [
    '<script>setTimeout(function () { location.reload(); }, 1000);</script>',
    available ? '<strong style="color: green">Available</strong>' : '<strong style="color: red">Unavailable</strong>'
  ].join("\n")

  res.send(html);
});

app.get('/status.json', function (req, res) {
  res.json({ available: available });
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
