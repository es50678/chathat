const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;

const config = require("../config");
const helpers = require("../helpers");
const db = require("../db");

module.exports = () => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    db.userModel
      .findById(id)
      .then(user => {
        done(null, user);
      })
      .catch(e => console.log("e", e));
  });

  const authProcess = (accessToken, refreshToken, profile, done) => {
    //  Find a user in local db using profile.id
    helpers.findOne(profile.id).then(result => {
      if (result) {
        //  If the user is found, return user data using done()
        done(null, result);
      } else {
        //  If the user is not found, create one in the db and return it
        helpers
          .createNewUser(profile)
          .then(newChatUser => done(null, newChatUser))
          .catch(err => console.log("err", err));
      }
    });
  };
  passport.use(new FacebookStrategy(config.fb, authProcess));
};
