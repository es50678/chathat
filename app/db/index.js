const config = require("../config");
const Mongoose = require("mongoose");

Mongoose.Promise = global.Promise;

Mongoose.connect(config.dbURI)
  .then(() => {
    console.log("Mongoose Connected");
  })
  .catch(e => {
    console.log("error", e);
  });

//define structure for storing user data
const chatUser = new Mongoose.Schema({
  profileId: String,
  fullName: String,
  profilePic: String
});

const userModel = Mongoose.model('chatUser', chatUser);

module.exports = {
  Mongoose,
  userModel
};
