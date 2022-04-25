const express = require("express");
const router = express.Router();
const db = require("../fake-db");

router.post("/login", (req, res) => {
    let givenUsername = req.body.username;
    let givenPassword = req.body.password;
    let foundUser = db.getUserByUsername(givenUsername);
    if (foundUser && foundUser.password === givenPassword) {
      req.session.whoami = givenUsername;
      res.redirect("/");
    } else {
      res.redirect("login");
    }
  })
  
  router.get("/login", (req, res) => {
    let user = db.getUserByUsername(req.session.whoami); 
    res.render("login", { user });
  })
  
  router.post("/logout", (req, res) => {
    res.clearCookie("whoami");
    res.clearCookie("whoami.sig");
    res.redirect("/");
  })

module.exports = router;