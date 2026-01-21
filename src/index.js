const http = require("http");
const getUsers = require("./modules/users.js");

const port = 3000;
const hostname = "127.0.0.1";

const server = http.createServer((request, response) => {
  const url = new URL(request.url, `http://${hostname}:${port}`);
  const hasHelloParam = url.searchParams.has("hello");
  const userName = url.searchParams.get("hello");

  // 1. Обработка hello
  if (hasHelloParam) {
    if (userName && userName.trim()) {
      response.statusCode = 200;
      response.statusMessage = "OK";
      response.setHeader("Content-Type", "text/plain; charset=utf-8");
      response.write(`Hello, my friend ${userName}`);
      response.end();
      return;
    } else {
      response.statusCode = 400;
      response.statusMessage = "Bad Request";
      response.setHeader("Content-Type", "text/plain; charset=utf-8");
      response.write("Enter a name");
      response.end();
      return;
    }
  }

  // 2. Обработка users как search-параметра
  if (url.pathname === "/" && url.searchParams.has("users")) {
    response.statusCode = 200;
    response.statusMessage = "OK";
    response.setHeader("Content-Type", "application/json; charset=utf-8");
    response.write(getUsers());
    response.end();
    return;
  }

  // 3. Обработка пользователей по пути /users
  if (url.pathname === "/users") {
    response.statusCode = 200;
    response.statusMessage = "OK";
    response.setHeader("Content-Type", "application/json; charset=utf-8");
    response.write(getUsers());
    response.end();
    return;
  }

  // 4. Корень
  if (url.pathname === "/" && [...url.searchParams.keys()].length === 0) {
    response.statusCode = 200;
    response.statusMessage = "OK";
    response.setHeader("Content-Type", "text/plain; charset=utf-8");
    response.write("Hello world");
    response.end();
    return;
  }

  // 5. Неизвестные запросы
  response.statusCode = 500;
  response.statusMessage = "Internal Server Error";
  response.setHeader("Content-Type", "text/plain; charset=utf-8");
  response.write("wrong");
  response.end();
});

server.listen(port, () => {
  console.log(`Сервер запущен по адресу http://${hostname}:${port}/`);
});
