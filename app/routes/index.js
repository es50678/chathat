const passport = require("passport");

const helpers = require("../helpers");
const config = require("../config");

module.exports = () => {
  let routes = {
    get: {
      "/": (req, res, next) => {
        res.render("login", { pageTitle: "My Login Page" });
      },
      "/rooms": [
        helpers.isAuthenticated,
        (req, res, next) => {
          res.render("rooms", {
            user: req.user,
            host: config.host
          });
        }
      ],
      "/chat": [
        helpers.isAuthenticated,
        (req, res, next) => {
          res.render("chatroom", { user: req.user, host: config.host });
        }
      ],
      "/getsession": (req, res, next) => {
        res.send("My favourite color: " + req.session.favColor);
      },
      "/setsession": (req, res, next) => {
        req.session.favColor = "Red";
        res.send("session set");
      },
      "/auth/facebook": passport.authenticate("facebook"),
      "/auth/facebook/callback": passport.authenticate("facebook", {
        successRedirect: "/rooms",
        failureRedirect: "/"
      }),
      "/auth/twitter": passport.authenticate("twitter"),
      "/auth/twitter/callback": passport.authenticate("twitter", {
        successRedirect: "/rooms",
        failureRedirect: "/"
      }),
      "/logout": (req, res, next) => {
        req.logout();
        res.redirect("/");
      }
    },
    post: {},
    NA: (req, res, next) => {
      res.status(404).sendFile(process.cwd() + "/views/404.html");
    }
  };

  return helpers.route(routes);
};
