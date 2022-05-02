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
  const user = await dbModel.getUser(email)
  const verified = bcrypt.compareSync(password, user.password);
  if (verified) {
    req.session.whoami = email;
    res.redirect("/home");
  } else {
    res.redirect("/authentication/login");
  }
  connection.release()
})
router.get("/login", async (req, res) => {
  const email = req.session.whoami
  const user = await dbModel.getUser(email);
  console.log(user)
  res.render("login", { user });
})
// router.post("/signup", async (req, res) => {
//   const first_name = req.body.first_name
//   const last_name = req.body.last_name
//   const email = req.body.email
//   const password = req.body.password
//   const hash = await bcrypt.hash(password, 10)
//   adduser = await dbModel.addUser(first_name, last_name, email, hash)
//   res.redirect("/");
// })
// router.get("/signup", async (req, res) => {
//   const user = await dbModel.getUser();
//   res.render("signup", { user });
// })

router.post("/logout", (req, res) => {
  res.clearCookie("whoami");
  res.clearCookie("whoami.sig");
  res.redirect("/authentication/login");
})
router.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  console.error(err);
  res.status(500).send({ error: "something bad happened" });
});

module.exports = router;