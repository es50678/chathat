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
      const updatedRoom = helpers.addUserToRoom(allRooms, data, socket);

      //update the list of active users
      if (updatedRoom) {
        io
          .of("/chatter")
          .to(data.roomID)
          .emit("updateUsersList", updatedRoom.users);
      }
    });

    //when a new message arrives
    socket.on("newMessage", data => {
      socket.to(data.roomID).emit("inMessage", data);
    });

    //  when a socket disconnects
    socket.on("disconnect", () => {
      //  find the room and purge the user
      let room = helpers.removeUserFromRoom(allRooms, socket);
      socket.broadcast.to(room.roomID).emit("updateUsersList", room.users);
    });
  });
};
