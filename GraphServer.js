var http = require("http");
var fs = require("fs");
var method;
var url;
var points=[];
var pointC=0;
var webPage=fs.readFileSync("webPage.txt", "utf8");

http.createServer(function (req, resp) {
    method = req.method;
    url = req.url;
    
    console.log("method = " + method + "   url = " + url + " \n");

    if (url.indexOf("/addPoint/x=") == 0) {
        try{
            var xEndP=url.indexOf("/",11);
            points[pointC][0] = parseInt(url.splice(11, xEndP));
            var yEndP = url.indexOf("/", xEndP + 1);
            points[pointC][1] = parseInt(url.splice(xEndP + 2, yEndP));
            pointC++;
        }
        catch (e) {
            resp.end();
        }
    }

    else if (url == "/") {
        resp.writeHead(200, { "Content-Type": "text/html" });
        resp.end(fs.readFileSync("webPage.txt", "utf8"));
    }
    else { resp.end();}

    req.on('error', function (err) {
        // This prints the error message and stack trace to `stderr`.
        console.error(err.stack);
    });

}).listen(1234);

console.log("Server running at localhost:1234");