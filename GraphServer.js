var http = require("http");
var fs = require("fs");
var method;
var url;
var points = [];
var pointC = 0;

//webpage templates
var webPage = fs.readFileSync("webPage.txt", "utf8");
var graph = fs.readFileSync("graph.txt","utf8");

var graphWebPage = "";

var ipAdresa = "172.20.10.2";


http.createServer(function (req, resp) {

    method = req.method;
    url = req.url;

	//logging method and url to cmd
    console.log("\n method = " + method + "   url = " + url);

    if(url.indexOf("/addPoint/x=") == 0) {

        try {
            //getting xvalue and yvalue and storing them in points[]
            var xEndP = url.indexOf("/", 12);           
            var yEndP = url.indexOf("/", xEndP + 1);
            points.push([parseFloat(url.slice(12, xEndP)),parseFloat(url.slice(xEndP + 3, yEndP))]);//finnished point strorage

            //counting how many points are stored in points[]
            pointC++;
        } 
        catch(e) {
            console.log("Error aquiring point");
            console.log("##########\n" + e.message + "\n##########");
            console.log(e.description + "\n##########");
            resp.end();
        }
        finally {
            console.log("\n Point aquired (" + points[pointC - 1][0] + "," + points[pointC - 1][1] + ") \n");
        }

        resp.end();
    }

    else if(url == "/") {

        if (pointC > 0) {
			//sending website with points
            graphWebPage = graph;

			//making a string to define an array inside the graph string (which is a webpage template)
			var strPoints = "points = [";
			for(i=0;i<pointC;i++){
				strPoints+="["+points[i][0]+","+points[i][1]+"],";
            }
            strPoints += "];";//finnished making array definning string
			
			//replacing parts of the graph string (which is a webpage template)
			graphWebPage = graphWebPage.replace("//define points", strPoints);
			graphWebPage = graphWebPage.replace("//define pointC", pointC);//finnished replacing stuff
			
			resp.writeHead(200, { "Content-Type" : "text/html" });
			resp.end(graphWebPage);
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

}).listen(8080, ipAdresa);
//ip e ruterit te shpise="192.168.0.107"

console.log("Server running at " + ipAdresa + ":8080");