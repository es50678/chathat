let helpers = require("../helpers");

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

    socket.on("createNewRoom", newRoomInput => {
      //todo: Check to see if a room with the same title exists or not
      helpers.findRoomByName(allRooms, newRoomInput);
      //todo: if not, create one and broadcast it to everyone
    });
  });
};
