const http = require("http");
const { router } = require("./router");
const server = http.createServer(router);
const PORT = process.env.PORT||8300;
server.listen(PORT, () => console.log(`Connected Successfully @ ${PORT} `));
