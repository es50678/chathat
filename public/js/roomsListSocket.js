let socket = io("http://localhost:3000/roomslist");
socket.on("connect", () => {
  console.log("socket.io connected to server");
});
