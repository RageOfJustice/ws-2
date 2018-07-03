var net = require("net");
const { Request } = require("./utils");
const { METHODS } = require("./constants");

var client = new net.Socket();
client.connect(
  1337,
  "127.0.0.1"
);

client.on("data", function(data) {
  console.log(data.toString());
});

client.on("close", function() {
  console.log("Connection closed");
});

let req = new Request();
req
  .setPath("/")
  .setMethod(METHODS.POST)
  .setBody("Hello, Server!")
  .addHeader("Authorization", "asdagsfasEGHHnkk124gasbhjjnjfkskng123fxeE");

client.write(Buffer.from(req.toString()));

req = new Request();
req.setPath("/hello").setMethod(METHODS.GET);

client.write(Buffer.from(req.toString()));
