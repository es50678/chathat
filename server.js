const express = require("express");
const app = express();
const passport = require("passport");

const chatCat = require("./app");

app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(chatCat.session);
app.use(passport.initialize());
app.use(passport.session());

app.use("/", chatCat.router);

app.listen(app.get("port"), () => {
  console.log(`on port ${app.get("port")}`);
});
