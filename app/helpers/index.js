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

module.exports = {
  route,
  findOne,
  createNewUser,
  isAuthenticated
};
