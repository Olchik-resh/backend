const http = require("http");
const getUsers = require("./modules/users.js");

const port = 3000;
const hostname = "http://127.0.0.1";

const server = http.createServer((request, response) => {
  const ipAddress = "http://127.0.0.1";
  const url = new URL(request.url, ipAddress);
  const userName = url.searchParams.get("hello");

  if (userName) {
    response.statusCode = 200;
    response.statusMessage = "ok";
    response.setHeader("Content-Type", "text/plain");
    response.write(`Hello, my friend ${userName}`);
    response.end();
    return;
  }

  switch (request.url) {
    case "/users":
      response.statusCode = 200;
      response.statusMessage = "OK";
      response.setHeader("Content-Type", "application/json");
      response.write(getUsers());
      response.end();
      break;

    case "/?hello":
      response.statusCode = 400;
      response.statusMessage = "Bad Request";
      response.setHeader("Content-Type", "text/plain");
      response.write(`Enter a name`);
      response.end();
      break;

    case "/":
      response.statusCode = 200;
      response.statusMessage = "OK";
      response.setHeader("Content-Type", "text/plain");
      response.write(`Hello world`);
      response.end();
      break;

    default:
      response.statusCode = 500;
      response.statusMessage = "Internal Server Error";
      response.setHeader("Content-Type", "text/plain");
      response.write("wrong");
      response.end();
      break;
  }
});

server.listen(port, () => {
  console.log(`Сервер запущен по адресу ${hostname}:${port}/`);
});
