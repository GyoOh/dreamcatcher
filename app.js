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

app.get("/productPost", async (req, res) => {
  let email = req.session.whoami
  try {
    let connection = await database.getConnection()
    let getUsers = await dbModel.getUsers()
    let getUser = await dbModel.getUser(email)
    let user = getUser[0][0]
    console.log(getUsers)
    res.render("productPost", { user, getUsers });
    connection.release()
  } catch (error) {
    console.error(error)
    res.status(500).send({ error })
  }
})

app.post("/photoPC", async (req, res) => {
  try {
    let connection = await database.getConnection()
    let addImg = await dbModel.addImg()
    let product = req.body.product
    let price = req.body.price
    let ProductImage = req.body.ProductImage
    console.log(product)
    res.redirect("/products")
    connection.release()
  } catch (error) {
    console.error(error)
    res.status(500).send({ error })
  }
})

app.get("/products", async (req, res) => {
  try {
    let connection = await database.getConnection()
    let addUser = await dbModel.addImg()
    let getImg = await dbModel.getImg()
    let user = getUser[0][0]
    console.log(getImg)
    res.render("productsv2", {});
    connection.release()
  } catch (error) {
    console.error(error)
    res.status(500).send({ error })
  }
})

module.exports = app;