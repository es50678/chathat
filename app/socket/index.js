let helpers = require("../helpers");

module.exports = (io, app) => {
  let allRooms = app.locals.chatRooms;

  io.of("/roomslist").on("connection", socket => {
    socket.on("getChatrooms", () => {
      socket.emit("chatRoomsList", allRooms);
    });

    socket.on("createNewRoom", newRoomInput => {
      if (!helpers.findRoomByName(allRooms, newRoomInput)) {
        allRooms.push({
          room: newRoomInput,
          roomID: helpers.randomHex(),
          users: []
        });
        //  emit updated list to everyone connected to roomslist namespace
        io.of("/roomslist").emit("chatRoomsList", allRooms);
      }
    });
  });

  io.of("/chatter").on("connection", socket => {
    //join room
    socket.on("join", data => {
      let userList = helpers.addUserToRoom(allRooms, data, socket);
      console.log("userList", userList);
    });
  });
};
