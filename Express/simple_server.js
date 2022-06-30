const http = require("http");
const port = 3000;

const server = http.createServer();

server.on("request", (request, response) => {
  console.log("request method", request.method);
  console.log("request url", request.url);

  if (request.method === "GET" && request.url === "/about") {
    response.write("this is the about page");
  }

  if (request.method === "GET" && request.url === "/home") {
    response.write("welcome to our web server");
  }

  response.write("Hello there");
  response.end();
});

server.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});
