const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cookieSession = require("cookie-session");
const app = express();
const authentication = require("./routes/authentication");
const posts = require("./routes/posts");

const db = require("./fake-db");
const dbModel = require("./databaseAccessLayer")
const database = require("./databaseConnection");

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(cookieSession({
  name: 'whoami',
  httpOnly: "true",
  keys: ['key1', 'key2'],
  maxAge: 24 * 60 * 60 * 1000 //24hrs
}))

app.use("/authentication", authentication);
app.use("/posts", posts);

app.get("/", async (req, res) => {
  let email = req.session.whoami
  let getUser = await dbModel.getUser(email)
  let user = getUser[0][0]
  res.render("index", { user });
})

module.exports = app;