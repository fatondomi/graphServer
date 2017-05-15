var http = require("http");
var fs = require("fs");

http.createServer(function (req, resp) {
    resp.writeHead(200,{"Content-Type":"text/html"});
    resp.end(fs.readFileSync("webPage.txt", "utf8"));
    req.on('error', function (err) {
        // This prints the error message and stack trace to `stderr`.
        console.error(err.stack);
    });
}).listen(1234);

console.log("Server running at localhost:GetGraph");