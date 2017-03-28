var http = require('http'),
url = require("url"),
path = require("path"),
fs = require("fs");

http.createServer(function (req, res) {

	var pathname=__dirname+url.parse(req.url).pathname;
	if (path.extname(pathname)=="") {
		pathname+="/";
	}
	if (pathname.charAt(pathname.length-1)=="/"){
		pathname+="index.html";
	}
	switch(path.extname(pathname)){
		case ".html":
		var addr = req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress;
		var remoteAddres = "访问地址："+addr.replace("::ffff:","") + "   访问时间：" + new Date();
		console.log(remoteAddres);
		res.writeHead(200, {"Content-Type": "text/html"});
		break;
		case ".js":
		res.writeHead(200, {"Content-Type": "text/javascript"});
		break;
		case ".css":
		res.writeHead(200, {"Content-Type": "text/css"});
		break;
		case ".gif":
		res.writeHead(200, {"Content-Type": "image/gif"});
		break;
		case ".jpg":
		res.writeHead(200, {"Content-Type": "image/jpeg"});
		break;
		case ".png":
		res.writeHead(200, {"Content-Type": "image/png"});
		break;
		default:
		res.writeHead(200, {"Content-Type": "application/octet-stream"});
	}
	fs.readFile(pathname,function (err,data){
		res.end(data);
	});
}).listen(8888);

console.log('Server running at 8888');