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
    const description = req.params.description;
    const url = await s3.uploadFile(req.file)
    const image_url = `https://direct-upload-s3-bucket-idsp.s3.us-west-2.amazonaws.com/${url.Key}`
    await dbModel.addPost(user.user_id, description, image_url)
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

router.get("/", async (req, res) => {
    const user = await dbModel.getUser(req.session.whoami)
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
        await dbModel.getPost(user.user_id)
        await dbModel.addcomment(user.user_id, post.post_id, comments)
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

