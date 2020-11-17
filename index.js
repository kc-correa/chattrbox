var http = require('http'); //require is a built-in function used to access the http module included with Node
var fs = require('fs');
var extract = require('./extract');
var wss = require('./websockets-server');

var handleError = function (err, res) {
    res.writeHead(404);
    res.end();
};

var server = http.createServer(function (req, res) { //This function is called for every HTTP request
    console.log('Responding to a request.');
    
    var filePath = extract(req.url);
    fs.readFile(filePath, function (err, data) { //readFile method takes a file name and a callback
        if (err) {
            handleError(err, res);
            return;
        } else {
            res.end(data);
        }
    });
});
server.listen(3000); //Tell the server to listen on port 3000