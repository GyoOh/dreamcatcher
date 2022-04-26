const express = require("express");
const router = express.Router();
const db = require("../fake-db");
const dbModel = require("../databaseAccessLayer")
const database = require("../databaseConnection");

router.post("/login", async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  let foundUser = await dbModel.getUser(email)
  console.log(foundUser)
  if (foundUser && foundUser.password === givenPassword) {
    req.session.whoami = givenUsername;
    res.redirect("/");
  } else {
    res.redirect("login");
  }
})

router.get("/login", (req, res) => {
  let user = dbModel.getUser();
  res.render("login", { user });
})

router.post("/logout", (req, res) => {
  res.clearCookie("whoami");
  res.clearCookie("whoami.sig");
  res.redirect("/");
})

module.exports = router;