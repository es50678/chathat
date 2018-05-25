"use strict";
const _ = require("lodash");

const registerRoutes = (routes, method) => {
  _.forEach(routes, (value, key) => {
    if (
      typeof value === "object" &&
      value !== null &&
      !(value instanceof Array)
    ) {
      console.log(key, value);
    }
  });
};

registerRoutes({
  get: {
    "/": (req, res, next) => {
      res.render("login");
    },
    "/rooms": (req, res, next) => {
      res.render("rooms");
    },
    "/chat": (req, res, next) => {
      res.render("chatroom");
    }
  },
  post: {}
});
