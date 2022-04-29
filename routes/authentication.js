const express = require("express");
const router = express.Router();
const dbModel = require("../databaseAccessLayer");
const database = require("../databaseConnection");
const { getConnection } = require("../databaseConnection");
const bcrypt = require("bcrypt")

router.post("/login", async (req, res) => {
  const connection = await database.getConnection()
  let email = req.body.email;
  const password = req.body.password;
  const hash = await bcrypt.hash(password, 10)
  const foundUser = await dbModel.getUser(email)
  const user = foundUser[0][0]
  const verified = bcrypt.compareSync(password, hash);
  if (verified) {
    req.session.whoami = email;
    res.redirect("/");
    connection.release()
  } else {
    res.redirect("login");
  }
})
router.get("/login", async (req, res) => {
  const email = req.session.whoami
  const user = await dbModel.getUser(email);
  console.log(user)
  res.render("login", { user });
})
router.post("/signup", async (req, res) => {
  const first_name = req.body.first_name
  const last_name = req.body.last_name
  const email = req.body.email
  const password = req.body.password
  const hash = await bcrypt.hash(password, 8)
  const adduser = await dbModel.addUser(first_name, last_name, email, hash)
  res.redirect("/");
})
router.get("/signup", async (req, res) => {
  const user = await dbModel.getUser();
  res.render("signup", { user });
})

router.post("/logout", (req, res) => {
  res.clearCookie("whoami");
  res.clearCookie("whoami.sig");
  res.redirect("/");
})
router.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  console.error(err);
  res.status(500).send({ error: "something bad happened" });
});

module.exports = router;