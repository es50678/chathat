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
      "/chat/:id": [
        helpers.isAuthenticated,
        (req, res, next) => {
          //todo: find chatroom with the given id
          //todo: render it if the id is found
          let getRoom = helpers.findRoomById(
            req.app.locals.chatRooms,
            req.params.id
          );

          if (getRoom === undefined) {
            return next();
          }

          res.render("chatroom", { user: req.user, host: config.host });
        }
      ],
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
