const express = require("express");
const app = express();

const chatCat = require("./app");

app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(chatCat.session);

app.use("/", chatCat.router);

app.listen(app.get("port"), () => {
  console.log(`on port ${app.get("port")}`);
});
