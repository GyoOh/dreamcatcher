const express = require("express");
const router = express.Router();
const db = require("../fake-db");

router.get("/show/:commentid", (req, res) => {
    const comment = db.getComment(req.params.commentid);
    const user = db.getUserByUsername(req.session.whoami);
    res.render("comment", { comment, user })
})

router.get("/deleteconfirm/:commentid", (req, res) => {
    const postid = req.query.postid;
    const commentid = req.params.commentid;
    const user = db.getUserByUsername(req.session.whoami)
    res.render("deletecomment", { commentid, postid, user });
})
router.post("/delete/:commentid", (req, res) => {
    const postid = req.query.postid;
    const commentid = req.params.commentid;
    db.deleteComment(commentid);
    res.redirect(`/posts/show/${postid}`);
})


module.exports = router;