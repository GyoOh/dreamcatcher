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

router.use((req, res, next) => {
    res.header({ "Access-Control-Allow-Origin": "*" });
    next();
})

router.post("/create", upload.single("image"), async (req, res) => {
    const connection = await database.getConnection()
    const user = await dbModel.getUser(req.session.whoami)
    const { filename, path } = req.file
    const description = req.body.description
    const url = await s3.uploadFile(req.file)
    const image_url = `https://direct-upload-s3-bucket-idsp.s3.us-west-2.amazonaws.com/${url.Key}`
    await dbModel.addPost(user.user_id, description, image_url)
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

router.get("/", async (req, res) => {
    const user = await dbModel.getUser(req.session.whoami)
    const users = await dbModel.getUsers()
    const posts = await dbModel.getPosts()
    const commentId = await dbModel.getComments()
    if (!user) {
        res.redirect("/authentication/403");
    }
    res.render("post", { user, users, posts, commentId });
})

router.post("/:post_id/comment", async (req, res) => {
    const user = await dbModel.getUser(req.session.whoami)
    post_id = req.params.post_id
    if (user) {
        const comments = req.body.comments
        await dbModel.addcomment(user.user_id, req.body.post_id, comments)
    }
})

router.post("/:post_id/like", async (req, res) => {
    const user = await dbModel.getUser(req.session.whoami)
    const postId = req.params.post_id
    await dbModel.getpostLikesByuser(user.user_id, postId)
    await dbModel.addPostLikes(user.user_id, postId)
})

router.post("/:post_id/dislike", async (req, res) => {
    const user = await dbModel.getUser(req.session.whoami)
    const postId = req.params.post_id
    const likedByUser = await dbModel.getpostLikesByuser(user.user_id, postId)
    if (likedByUser[0]) {
        await dbModel.deletePostLikes(likedByUser[0].like_id)
        res.status(200).json();
        res.end();
    }
})
router.delete("/deletePost", async (req, res) => {
    console.log("DELETE ENDPOINT")
    const id = req.query.id
    console.log("Id in endpoint" + id)
    await dbModel.deletePost(id)
    res.end();

})

router.use((err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }
    console.error(err);
    res.status(500).send({ error: "something bad happened" });
});

router.delete("/deletePost", async (req, res) => {
    console.log("DELETE ENDPOINT")
    const id = req.query.id
    console.log("Id in endpoint" + id)
    try {
        await dbModel.deletePost(id)
        res.end();
    } catch (error) {
      console.error(error)
      res.status(500).send({ error: "error" })
    }
  })

module.exports = router;

