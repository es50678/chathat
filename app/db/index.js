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

module.exports = {
  Mongoose
};
