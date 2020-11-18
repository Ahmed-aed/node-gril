const path = require("path");
const fs = require("fs");

const { handlePublic, handlePost } = require("./handlers");

module.exports.router = (req, res) => {
	const endpoint = req.url;
	if (endpoint === "/") {
		handlePublic(req, res, "/public/index.html");
	} else if (endpoint.includes("public")) {
		handlePublic(req, res, endpoint);
	} else if (endpoint === "/create-post" && req.method === "POST") {
		let onePost;
		req.on("data", (data) => {
			onePost += data;
		});
		req.on("end", () => {
			handlePost(req, res, onePost, "posts.json", "/");
		});
	} else if (endpoint === "/posts") {
		const filePath = path.join(__dirname, "posts.json");
		fs.readFile(filePath, "utf-8", (error, file) => {
			if (error) return;
			res.writeHead(200, { "Content-Type": "application/json" });
			res.write(file);
			res.end();
		});
	}
};
