const path = require("path");
const fs = require("fs");
const querystring = require("querystring");
module.exports.handlePublic = (req, res, url) => {
	const mimeTypes = {
		css: "text/css",
		js: "test/javascript",
		png: "image/png",
		html: "text/html",
		ico: "image/x-icon",
	};
	const filePath = path.join(__dirname, "..", url);
	fs.readFile(filePath, (error, file) => {
		if (error) {
			res.writeHead(500, { "Content-Type": "text/html" });
			res.end("<h1>Server Error </h1>");
		}
		res.writeHead(200, {
			"Content-Type": mimeTypes[path.extname(url).substr(1)],
		});
		res.end(file);
	});
};

module.exports.handlePost = (
	req,
	res,
	sentData,
	fileName,
	redirectLocation
) => {
	onePostParse = querystring.parse(sentData);

	const filePath = path.join(__dirname, fileName);
	fs.readFile(filePath, (error, file) => {
		if (error) return;
		oldData = JSON.parse(file);
		oldData[Date.now()] = Object.values(onePostParse)[0];
		fs.writeFile(filePath, JSON.stringify(oldData), (error) => {
			if (error) return;
		});
	});
	//redirect to home page
	res.writeHead(302, {
		Location: redirectLocation,
	});
	res.end();
};
