const express = require("express");
const router = express.Router();
const db = require("../fake-db");

router.get("/list", (req, res) => {
    let user = db.getUserByUsername(req.session.whoami);
    let subs = db.getSubs();
    res.render("subs", { subs, user });
})

router.get("/show/:subname", (req, res) => {
    let subName = req.params.subname;
    let posts = db.getPosts(20, subName);
    let id = req.session.whoami
    let user = db.getUserByUsername(id);
    for (const post of posts) {
        let user = db.getUser(post.creator);
        post.creatorName = user.uname;
    }
    res.render("sub", { posts, user });
})

module.exports = router;