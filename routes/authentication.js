const express = require("express");
const router = express.Router();
const dbModel = require("../databaseAccessLayer");
const { getConnection } = require("../databaseConnection");
const database = require("../databaseConnection");

router.post("/login", async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  try {
    let connection = await database.getConnection()
    console.log(connection)
    let foundUser = await dbModel.getUser(email)
    let user = foundUser[0][0]
    // Use bcrypt for the password
    if (user && user.password === password) {
      req.session.whoami = email;
      connection.dbConnection.release()
      res.redirect("/");
    } else {
      res.redirect("login");
    }
  } catch (error) {
    console.error(error)
  }
})

router.get("/login", async (req, res) => {
  let user = await dbModel.getUser();
  console.log("Cookies: ", req.cookies);
  console.log("Signed Cookies: ", req.signedCookies);
  res.render("login", { user });
})

router.post("/logout", (req, res) => {
  res.clearCookie("whoami");
  res.clearCookie("whoami.sig");
  res.redirect("/");
})

module.exports = router;