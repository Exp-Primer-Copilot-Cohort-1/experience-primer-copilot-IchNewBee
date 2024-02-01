// Create web server
// Create HTTP server
// Create a web server object
var http = require('http');
var url = require('url');
var fs = require('fs');
var path = require('path');
var formidable = require('formidable');
var util = require('util');
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('comments.db');

// Create a server object
http.createServer(function (req, res) {
  // Parse the request containing file name
  var pathname = url.parse(req.url).pathname;
  // Print the name of the file for which request is made
  console.log("Request for " + pathname + " received.");
  // Read the requested file content from file system
  if (pathname == "/") {
    pathname = "/index.html";
  }
  var filename = path.join(process.cwd(), pathname);
  fs.readFile(filename, function(err, data){
    if(err){
      console.log(err);
      // HTTP Status: 404 : NOT FOUND
      // Content Type: text/plain
      res.writeHead(404, {'Content-Type': 'text/html'});
    }else{
      //Page found
      // HTTP Status: 200 : OK
      // Content Type: text/plain
      res.writeHead(200, {'Content-Type': 'text/html'});
      // Write the content of the file to response body
      res.write(data.toString());
    }
    // Send the response body
    res.end();
  });
}).listen(8081);
// Console will print the message
console.log('Server running at http://');