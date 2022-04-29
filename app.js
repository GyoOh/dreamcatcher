const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cookieSession = require("cookie-session");
const app = express();
const authentication = require("./routes/authentication");
const posts = require("./routes/posts");
const database = require("./databaseConnection");
const dbModel = require("./databaseAccessLayer")

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
  try {
    let connection = await database.getConnection()
    let getUsers = await dbModel.getUsers()
    let getUser = await dbModel.getUser(email)
    let user = getUser[0][0]
    console.log(getUsers)
    res.render("index", { user, getUsers });
    connection.release()
  } catch (error) {
    console.error(error)
    res.status(500).send({ error })
  }
})

app.post("/post", async (req, res) => {
  try {
    const connection = await database.getConnection()
    const description = req.body.description
    const image_url = req.body.image_url
    const url = req.body.url
    const addImg = await dbModel.addImg(description, image_url, url)
    res.redirect("/post")
    connection.release()
  } catch (error) {
    console.error(error)
    res.status(500).send({ error })
  }
})

app.get("/post", async (req, res) => {
  try {
    let connection = await database.getConnection()
    let email = req.session.whoami
    let getUser = await dbModel.getUser(email)
    let user = getUser[0][0]
    let Imgs = await dbModel.getImgs()
    console.log(Imgs)
    res.render("post", { Imgs, user });
    connection.release()
  } catch (error) {
    console.error(error)
    res.status(500).send({ error })
  }
})

module.exports = app;