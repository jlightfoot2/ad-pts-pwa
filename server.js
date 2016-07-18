// simple express server

var
  app, server,
  express = require('express'),
  path = require('path'),
  host = process.env.HOST || '0.0.0.0',
  port = process.env.PORT || 3001,
  root = path.resolve(__dirname),
  https = require('https'),
  http = require('http')
  ;
  
/*
const options = {
  key: fs.readFileSync('sslcert/agent2-key.pem'),
  cert: fs.readFileSync('sslcert/agent2-cert.pem')
}*/

app = express();

app.use(function(req, res, next) { console.log(req.url); next(); });
app.use(express.static(root + '/build'));
//server = app.listen(port, host, serverStarted); //old server
server = http.createServer(app).listen(port);
//server = https.createServer(options, app).listen(443); //if ssl is option

function serverStarted () {
  console.log('Server started', host, port);
  console.log('Root directory', root);
  console.log('Press Ctrl+C to exit...\n');
}
serverStarted();
server.on('connect',() => console.log('connection made'));