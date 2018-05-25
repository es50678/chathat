const helpers = require("../helpers");
const passport = require("passport");

module.exports = () => {
  let routes = {
    get: {
      "/": (req, res, next) => {
        res.render("login", { pageTitle: "My Login Page" });
      },
      "/rooms": (req, res, next) => {
        res.render("rooms");
      },
      "/chat": (req, res, next) => {
        res.render("chatroom");
      },
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
      })
    },
    post: {},
    NA: (req, res, next) => {
      res.status(404).sendFile(process.cwd() + "/views/404.html");
    }
  };

  return helpers.route(routes);
};
