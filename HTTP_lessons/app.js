const { response } = require("express");
const http = require("http");
const PORT = 8080;

// this function handles requests and send responses to the client
const requestHandler = function (request, response) {
  if (request.url === "/") {
    response.end("Welcome");
  } else if (request.url === "/urls") {
    response.end("www.lighouselabs.ca\nwwww.google.com");
  } else {
    response.statusCode = 404;
    response.end("404 page not found");
  }
};

console.log("Last line (after .listen call)"); // NEW LINE

// ====================================================================
