const net = require("net");
const { Request, Response } = require("./utils");
const { METHODS } = require("./constants");

let currentSocket = null;

const handler = data => {
  if (!currentSocket) return;

  const req = new Request(data);

  let res = new Response();
  if (req.method === METHODS.GET) {
    switch (req.path) {
      case "/":
        break;
      default:
        res.setStatus(404).setBody("Path unspecified");
    }
  } else if (req.method === METHODS.POST) {
    switch (req.path) {
      case "/":
        res
          .setBody("Hello, Client!")
          .addHeader(
            "Authorization",
            "asdagsfasEGHHnkk124gasbhjjnjfkskng123fxeE"
          );
        break;
      default:
        res.setStatus(404).setBody("Path unspecified");
    }
  }

  currentSocket.write(Buffer.from(res.toString()));
};

const server = net.createServer(function(socket) {
  currentSocket = socket;
  socket.on("data", handler);
});

server.listen(1337, "127.0.0.1");
