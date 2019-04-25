var express = require('express');
var app = express();

var https = require('https');
var fs = require('fs'); // Using the filesystem module

var credentials = {
  key: fs.readFileSync('/etc/letsencrypt/live/www.superfrustrated.nyc/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/www.superfrustrated.nyc/cert.pem')
};

app.use(express.static('public'));

app.get('/', function (req, res) {
  res.send('Hello World!')
});

// app.listen(80, function () {
//   console.log('Example app listening on port 80!')
// });

var httpsServer = https.createServer(credentials, app);

// Default HTTPS Port
httpsServer.listen(443);
