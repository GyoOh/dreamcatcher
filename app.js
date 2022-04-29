const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cookieSession = require("cookie-session");
const app = express();
const authentication = require("./routes/authentication");
const posts = require("./routes/posts");
const database = require("./databaseConnection");
const dbModel = require("./databaseAccessLayer")
const bcrypt = require("bcrypt")

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
  const email = req.session.whoami
  const connection = await database.getConnection()
  const getUsers = await dbModel.getUsers()
  const user = await dbModel.getUser(email)
  res.render("index", { user, getUsers });
  connection.release()
})

app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  console.error(err);
  res.status(500).send({ error: "something bad happened" });
});

module.exports = app;