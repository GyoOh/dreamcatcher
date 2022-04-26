const express = require("express");
const router = express.Router();
const db = require("../fake-db");
const dbModel = require("../databaseAccessLayer")
const database = require("../databaseConnection");

router.post("/login", async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  let foundUser = await dbModel.getUser(email)
  let user = foundUser[0][0]
  console.log(user)

  // Use bcrypt for the password
  if (user && user.password === password) {
    // succesfully logged in
    // set the cookie to be the user's email
    req.session.whoami = email;
    res.redirect("/");
  } else {
    res.redirect("login");
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