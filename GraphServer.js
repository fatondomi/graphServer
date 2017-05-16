var http = require("http");
var fs = require("fs");
var method;
var url;
var points=[];
var pointC=0;

//webpage templates
var webPage=fs.readFileSync("webPage.txt", "utf8");
var graph=fs.readFileSync("graph.txt","utf8");

http.createServer(function (req, resp) {
    method = req.method;
    url = req.url;
    
	//logging method and url to cmd
    console.log("method = " + method + "   url = " + url+"\n");

    if (url.indexOf("/addPoint/x=") == 0) {
        try{
			//getting xvalue and yvalue and storing them in points[]
            var xEndP=url.indexOf("/",12);
            points[pointC][0] = parseInt(url.slice(12, xEndP));
            var yEndP = url.indexOf("/", xEndP + 1);
            points[pointC][1] = parseInt(url.slice(xEndP + 3, yEndP));//finnished point strorage
			
			//counting how many points are stored in points[]
            pointC++; console.log("pointC = " + pointC);
        }
        catch (e) {
			console.log("Error while adding point!  x="+parseInt(url.splice(11, xEndP)));
            resp.end();
        }
        console.log("point aquired (" + parseInt(url.slice(12, xEndP))+","+parseInt(url.slice(xEndP + 3, yEndP)+")"));
		resp.end();
    }

    else if (url == "/") {
        if (pointC > 0) {
			//sending website with points 
			
			//making a string to define an array inside the graph string (which is a webpage template)
			var strPoints="points=[";
			for(i=0;i<pointC;i++){
				strPoints+="["+points[i][0]+","+points[i][1]+"],";
			}strPoints+="]";//finnished making array definning string
			
			//replacing parts of the graph string (which is a webpage template)
			var newGraph=graph.replace("//define points",strPoints);
			newGraph=newGraph.replace("pointC",pointC);//finnished replacing stuff
			
			resp.writeHead(200, { "Content-Type": "text/html" });
			resp.end(newGraph);
        }
		
        else{
		//sending "there are no points available"
        resp.writeHead(200, { "Content-Type": "text/html" });
        resp.end(webPage);
        }
    }
	
	//for irregular urls
    else { resp.end();}

    req.on('error', function (err) {
        // This prints the error message and stack trace to `stderr`.
        console.error(err.stack);
    });

}).listen(1234);

console.log("Server running at localhost:1234");