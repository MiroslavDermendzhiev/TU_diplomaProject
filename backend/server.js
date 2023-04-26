const http = require("http");
const app = require("./app"); // importing the app js file so we can use it

// The  normalizePort  function returns a valid port, whether it is provided as a number or a string.

// The  errorHandler  function checks for various errors and handles them appropriately — it is then registered to the server.

// A "listening" event listener is also registered, logging the port or named pipe on which the server is running to the console.

// In general: Adding port normalization, error handling and basic logging to your Node server makes your app run more consistently and easier to debug

const normalizePort = (val) => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};

const port = normalizePort(process.env.PORT || "3000"); //express app should know which port we are on
app.set("port", port);

const errorHandler = (error) => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const address = server.address();
  const bind =
    typeof address === "string" ? "pipe " + address : "port: " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges.");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use.");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const server = http.createServer(app);
server.on("error", errorHandler);
server.on("listening", () => {
  const address = server.address();
  const bind = typeof address === "string" ? "pipe " + address : "port " + port;
  console.log("Listening on " + bind);
});

server.listen(port); // process.env.PORT - environment port variable; dinamically injected by node
