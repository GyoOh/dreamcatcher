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
const database = require("./databaseAccessLayer")

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
  let allUsers = database.getAllUsers
  console.log(allUsers)
  // let posts = db.getPosts();
  // let user = db.getUserByUsername(req.session.whoami);
  // for (const post of posts) {
  //   let user = db.getUser(post.creator);
  //   post.creatorName = user.uname;
  // }

  res.render("index", { posts, user });
})

module.exports = app;