const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cookieSession = require("cookie-session");
const app = express();
const authentication = require("./routes/authentication");
const posts = require("./routes/posts");
const subs = require("./routes/subs");
const comments = require("./routes/comments");

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
app.use("/subs", subs);
app.use("/comments", comments);

app.get("/", (req, res) => {

  res.render("index", {});
})
// app.get("/login", (req, res) => {
//   console.log("page hit");
//   let userId = req.query.id;
//   console.log(userId)
//   let user = dbModel.getUser(userId)
//   if (user === null) {
//     res.render("error", { message: "Error connecting to MySQL" });
//     console.log("Error connecting to userModel");
//   } else {
//     console.log(user)
//     res.render("login", { user });
//   }
// })
app.get("/:id", (req, res) => {
  const id = +req.params.id;
  dbModel.getUser(id, (error, user) => {
    if (error) {
      console.error(error);
      res.status(500), send({ error });
      return;
    }
    if (!user) {
      res.status(400).send({ error: `there is no user with this id ${id}` });
      return;
    }
    res.send(user);
  });
});



module.exports = app;