const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const db = require("../db");

const config = require("../config");

if (process.env.NODE_ENV === "production") {
  //  initialize session with setting for production
  module.exports = session({
    secret: config.sessionSecret,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({
      mongooseConnection: db.Mongoose.connection
    })
  });
} else {
  module.exports = session({
    secret: config.sessionSecret,
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({
      mongooseConnection: db.Mongoose.connection
    })
  });
}
