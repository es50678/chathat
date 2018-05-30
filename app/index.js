// Social Authentication Logic
require("./auth")();

//create IO server instance

let ioServer = app => {
  const server = require("http").Server(app);
  const io = require("socket.io")(server);
  return server;
};

module.exports = {
  router: require("./routes")(),
  session: require("./session"),
  ioServer
};
