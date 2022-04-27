const express = require("express");
const router = express.Router();
const dbModel = require("../databaseAccessLayer");
const { getConnection } = require("../databaseConnection");
const db = require("../databaseConnection");
const bcrypt = require("bcrypt")

router.post("/login", async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  try {
    let connection = await db.getConnection()
    let foundUser = await dbModel.getUser(email)
    let user = foundUser[0][0]

    if (user && user.password === password) {
      req.session.whoami = email;
      res.redirect("/");
      connection.release()
    } else {
      res.redirect("login");
    }
  } catch (error) {
    console.error(error)
  }
})

router.get("/login", async (req, res) => {
  let user = await dbModel.getUser();
  res.render("login", { user });
})

router.post("/logout", (req, res) => {
  res.clearCookie("whoami");
  res.clearCookie("whoami.sig");
  res.redirect("/");
})

module.exports = router;