let chatUsers = $(".chatUsers");
let chatInput = $("input[name='userInput']");
let chatMessagesDiv = $(".chatMessages");

let userList = user => {
  console.log("user", user);
  return `<div class="userBlock">
					<div class="userPic"><img src="${user.userPic}" alt="${user.userName}"></div>
					<div class="cuserName">${user.userName}</div>
				</div>`;
};

let updateFeed = (userPic, message) => {
  let template = `<div class="chatBlock">
					<div class="userPic"><img src="${userPic}"></div>
					<div class="chatMsg">${message}</div>
				</div>`;
  $(template)
    .hide()
    .prependTo(chatMessagesDiv)
    .slideDown(200);
};

chatInput.on("keyup", function(evt) {
  evt.preventDefault();
  let messageFld = $(this);
  if (evt.which === 13 && messageFld.val() !== "") {
    socket.emit("newMessage", {
      roomID,
      userName,
      userPic,
      message: messageFld.val()
    });
    //  update local feed
    updateFeed(userPic, messageFld.val());
    messageFld.val("");
  }
});

socket.on("connect", () => {
  socket.emit("join", { roomID, userName, userPic });
});

socket.on("updateUsersList", data => {
  let usersListData = "";
  data.forEach(user => {
    usersListData += userList(user);
  });
  chatUsers.html("").html(usersListData);
});

socket.on("inMessage", data => {
  updateFeed(data.userPic, data.message);
});
