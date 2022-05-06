const express = require("express");
const router = express.Router();
const database = require("../databaseConnection")
const dbModel = require("../databaseAccessLayer")
const multer = require("multer")
const s3 = require("../s3")
const path = require('path');
const { CodeBuild } = require("aws-sdk");
const { Console } = require("console");
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
    const description = req.body.description
    const url = await s3.uploadFile(req.file)
    const image_url = `https://direct-upload-s3-bucket-idsp.s3.us-west-2.amazonaws.com/${url.Key}`
    await dbModel.addPost(user.user_id, description, image_url)
    if (user) {
        let posts = await dbModel.getPostByUserId(user.user_id)
        let comments = req.body.comments
        let likes = req.body.likes
        await dbModel.getPostByUserId(user.user_id)
    }
    res.redirect("/posts")
    connection.release()
})

router.get("/create", async (req, res) => {
    const user = await dbModel.getUser(req.session.whoami)
    const users = await dbModel.getUsers()
    if (!user) {
        return res.redirect("/authentication/403");
    }
    const posts = await dbModel.getPosts()
    res.render("newpost", { posts, user, users });
})
router.post("/", async (req, res) => {
    const connection = await database.getConnection()
    const user = await dbModel.getUser(req.session.whoami)
    if (user) {
        const comments = req.body.comments
        const comment = await dbModel.addcomment(user.user_id, req.body.post_id, comments)
    }
    res.redirect("/posts")
    connection.release()
})
router.get("/", async (req, res) => {
    const user = await dbModel.getUser(req.session.whoami)
    const users = await dbModel.getUsers()
    const posts = await dbModel.getPosts()
    const comments = await dbModel.getpostsWithComments()
    const commentId = await dbModel.getComments()
    console.log(posts)
    if (!user) {
        return res.redirect("/authentication/403");
    }
    res.render("post", { user, users, posts, comments, commentId });

})

router.post("/comment", async (req, res) => {
    const connection = await database.getConnection()
    const email = req.session.whoami
    const user = await dbModel.getUser(email)
    if (user) {
        let post = await dbModel.getPostByUserId(user.user_id)
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

