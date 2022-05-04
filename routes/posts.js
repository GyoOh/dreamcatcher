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
    const email = req.session.whoami
    const user = await dbModel.getUser(email)
    const { filename, path } = req.file
    // const description = req.body.description
    const url = await s3.uploadFile(req.file)
    const image_url = `https://direct-upload-s3-bucket-idsp.s3.us-west-2.amazonaws.com/${url.Key}`
    await dbModel.addPost(user.user_id, image_url)
    res.redirect("/posts")
    connection.release()
})

router.get("/create", async (req, res) => {
    const connection = await database.getConnection()
    const email = req.session.whoami
    const user = await dbModel.getUser(email)
    const posts = await dbModel.getPosts(user.user_id)
    res.render("newpost", { posts, user });
    connection.release()
})

router.get("/", async (req, res) => {
    const connection = await database.getConnection()
    const email = req.session.whoami
    const getUsers = await dbModel.getUsers()
    const user = await dbModel.getUser(email)
    const posts = await dbModel.getPosts(user.user_id)
    console.log(posts)
    res.render("post", { posts, getUsers, user });
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

