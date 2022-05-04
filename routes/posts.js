const express = require("express");
const router = express.Router();
const database = require("../databaseConnection")
const dbModel = require("../databaseAccessLayer")
const multer = require("multer")
const s3 = require("../s3")
const path = require('path')
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images')
    },
    filename: (req, file, cb) => {
        console.log(file)
        cb(null, Date.now() + path.extname(file.originalname))
    }
})
const upload = multer({ storage: storage })

router.post("/create", upload.single("image"), async (req, res) => {
    const connection = await database.getConnection()
    const user = await dbModel.getUser(req.session.whoami)
    const { filename, path } = req.file
    const url = await s3.uploadFile(req.file)
    const image_url = `https://direct-upload-s3-bucket-idsp.s3.us-west-2.amazonaws.com/${url.Key}`
    const addpost = await dbModel.addPost(user.user_id, image_url)
    if (user) {
        let posts = await dbModel.getPost(user.user_id)
        let comments = req.body.comments
        let likes = req.body.likes
        await dbModel.getPost(user.user_id)
        await dbModel.addcomment(user.user_id, posts[0].post_id, comments)
        await dbModel.addPostLikes(user.user_id, posts[0].post_id, likes)
    }
    res.redirect("/posts")
    connection.release()
})

router.get("/create", async (req, res) => {
    const user = await dbModel.getUser(req.session.whoami)

    if (!user) {
        return res.redirect("/authentication/403");
    }
    const posts = await dbModel.getPosts(user.user_id)
    res.render("newpost", { posts, user });
})
router.post("/", async (req, res) => {
    const connection = await database.getConnection()
    const user = await dbModel.getUser(req.session.whoami)
    if (user) {
        let comments = req.body.comments
        console.log(comments)
        let post = await dbModel.getPost(user.user_id)
        await dbModel.addcomment(user.user_id, post[0].post_id, comments)
        // await dbModel.addLikes(user.user_id, post[0].post_id, req.body.likes)
    }
    res.redirect("/posts")
    connection.release()
})
router.get("/", async (req, res) => {
    const user = await dbModel.getUser(req.session.whoami)
    const post = await dbModel.getPost(user.user_id)
    const likes = await dbModel.getPostLikesUsers(user.user_id)
    const comments = await dbModel.getPostComments(post[0].post_id)
    console.log("likes", likes)
    console.log("post", post)
    console.log("comments", comments)

    if (!user) {
        return res.redirect("/authentication/403");
    }
    const posts = await dbModel.getPosts(user.user_id)
    res.render("post", { posts, user });
})

router.post("/comment", async (req, res) => {
    const connection = await database.getConnection()
    const email = req.session.whoami
    const user = await dbModel.getUser(email)
    if (user) {
        let post = await dbModel.getPost(user.user_id)
        await dbModel.addcomment(user.user_id, post[0].post_id, comments)
        await dbModel.addPostLikes(user.user_id, post[0].post_id, req.body.likes)
    }
    res.redirect("/posts")
    connection.release()
})

router.use((err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }
    console.error(err);
    res.status(500).send({ error: "something bad happened" });
});
module.exports = router;

