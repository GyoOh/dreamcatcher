const express = require("express");
const router = express.Router();
const db = require("../fake-db");

router.get("/", (req, res) => {
    let id = req.session.whoami
    res.render("post", { id });
})

router.get("/create", (req, res) => {
    let id = req.session.whoami;
    let user = db.getUserByUsername(id);
    res.render("newpost", { user });
})

router.post("/create", (req, res) => {
    let id = req.session.whoami;
    let user = db.getUserByUsername(id);
    let data = req.body;
    let title = data.title;
    let link = data.link;
    let creator = user.id;
    let description = data.description;
    let subgroup = data.subgroup;
    db.addPost(title, link, creator, description, subgroup);
    res.redirect("/");
})

router.get("/edit/:postid", (req, res) => {
    let postId = req.params.postid;
    let post = db.getPost(postId);
    let id = req.session.whoami
    let user = db.getUserByUsername(id);
    res.render("edit", { post, user });
})

router.post("/edit/:postid", (req, res) => {
    let postId = req.params.postid;
    let editedData = req.body;
    let id = req.session.whoami;
    let user = db.getUserByUsername(id);
    let post = db.getPost(postId);
    if (user.id === post.creator.id) {
        db.editPost(postId, editedData);
        res.redirect(`/posts/show/${postId}`);
    } else {
        res.redirect("/");
    }
})

router.get("/deleteconfirm/:postid", (req, res) => {
    let postId = req.params.postid;
    let post = db.getPost(postId);
    let id = req.session.whoami;
    let user = db.getUserByUsername(id);
    res.render("delete", { user, post });
})

router.post("/delete/:postid", (req, res) => {
    let postId = req.params.postid;
    let post = db.getPost(postId);
    let postCreator = post.creator;
    let id = req.session.whoami;
    let user = db.getUserByUsername(id);
    if (postCreator.id === user.id) {
        db.deletePost(post.id);
        res.redirect("/subs/list");
    } else {
        res.redirect(`/posts/show/${postId}`);
    }
})

router.post("/comment-create/:postid", (req, res) => {
    let postId = req.params.postid;
    let data = db.getPost(postId);
    let user = db.getUserByUsername(req.session.whoami);
    let creator = user.id;
    let description = req.body.comment;
    db.addComment(postId, creator, description);
    res.redirect(`/posts/show/${postId}`)
})

router.post("/vote/:postid", (req, res) => {
    let postId = req.params.postid;
    let vote = req.body.setvoteto;
    let id = req.session.whoami;
    let post = db.getPost(postId);
    let user = db.getUserByUsername(id);
    db.addVoteForPost(postId, user.id, Number(vote));
    res.redirect(`/posts/show/${postId}`)
})







module.exports = router;

