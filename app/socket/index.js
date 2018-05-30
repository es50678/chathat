module.exports = (io, app) => {
  let allRooms = app.locals.chatRooms;

  io.of("/roomslist").on("connection", socket => {
    console.log("socket.io connected to client");
  });
};
