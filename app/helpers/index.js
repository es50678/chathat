const crypto = require("crypto");

const router = require("express").Router();
const _ = require("lodash");

const db = require("../db");

let _registerRoutes = (routes, method) => {
  _.forEach(routes, (value, key) => {
    if (
      typeof value === "object" &&
      value !== null &&
      !(value instanceof Array)
    ) {
      _registerRoutes(value, key);
    } else {
      if (method === "get") {
        router.get(key, routes[key]);
      } else if (method === "post") {
        router.post(key, value);
      } else {
        console.log(key, value);
        router.use(value);
      }
    }
  });
};

let route = routes => {
  _registerRoutes(routes);
  return router;
};

// Find a single user based on a key
let findOne = profileID => {
  return db.userModel.findOne({
    profileId: profileID
  });
};

//create a new user and returns that instance
let createNewUser = profile => {
  // console.log('profile', profile);
  let newChatuser = new db.userModel({
    profileId: profile.id,
    fullName: profile.displayName,
    profilePic: profile.photos[0].value || " "
  });

  return newChatuser.save();
};

let isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect("/");
  }
};

//Find a chatroom by a given name
let findRoomByName = (allRooms, roomName) => {
  let findRoom = allRooms.findIndex((element, index) => {
    return element.room === roomName;
  });

  return findRoom > -1;
};

let randomHex = () => {
  return crypto.randomBytes(24).toString("hex");
};

let findRoomById = (allRooms, roomID) => {
  return allRooms.find((element, index) => {
    return element.roomID === roomID;
  });
};

// Add a user to a chatroom
let addUserToRoom = (allrooms, data, socket) => {
  //  get the room object
  let getRoom = findRoomById(allrooms, data.roomID);

  if (getRoom !== undefined) {
    //  Get the active user's ID(ObjectID from session)
    let userID = socket.request.session.passport.user;
    //  check if user is already in the chatroom
    let checkUser = getRoom.users.findIndex(element => {
      return element.userID === userID;
    });
    //  if user exists, remove him
    if (checkUser > -1) {
      getRoom.users.splice(checkUser, 1);
    }

    //  push user into rooms users array
    getRoom.users.push({
      socketID: socket.id,
      userID,
      userName: data.userName,
      userPic: data.userPic
    });

    //  Join the room channel
    socket.join(data.roomID);

    return getRoom;
  }
};

module.exports = {
  route,
  findOne,
  createNewUser,
  isAuthenticated,
  findRoomByName,
  randomHex,
  findRoomById,
  addUserToRoom
};
