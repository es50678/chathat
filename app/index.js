// Social Authentication Logic
require("./auth")();

//create IO server instance

let ioServer = app => {
  const server = require("http").Server(app);
  const io = require("socket.io")(server);

  app.locals.chatRooms = [];
  io.use((socket, next) => {
    require("./session")(socket.request, {}, next);
  });
  require("./socket")(io, app);
  return server;
};

module.exports = {
  router: require("./routes")(),
  session: require("./session"),
  ioServer
};
