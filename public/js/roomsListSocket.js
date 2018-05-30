let renderChatRooms = chatrooms => {
  let roomsListDiv = $("#roomsListUL");
  let listStr = "";
  console.log(chatrooms);
  for (let cat of chatrooms) {
    console.log(cat);
    listStr += `<a href='/chat/${cat.roomID}'><li>${cat.room}</li></a>`;
  }

  roomsListDiv.html("").append(listStr);
};

//get a list of chatrooms
socket.emit("getChatrooms");

//event listener for chatRoomsList
socket.on("chatRoomsList", chatRooms => {
  renderChatRooms(chatRooms);
});
