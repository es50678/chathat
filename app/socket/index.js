module.exports = (io, app) => {
  let allRooms = app.locals.chatRooms;

  allRooms.push({
    room: "Good Food",
    roomID: "001",
    users: []
  });

  allRooms.push({
    room: "Cloud Computing",
    roomID: "002",
    users: []
  });

  io.of("/roomslist").on("connection", socket => {
    socket.on("getChatrooms", () => {
      socket.emit("chatRoomsList", allRooms);
    });
  });
};
