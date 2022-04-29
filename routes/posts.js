const express = require("express");
const router = express.Router();
const database = require("../databaseConnection")
const dbModel = require("../databaseAccessLayer")

router.post("/create", async (req, res) => {
    const connection = await database.getConnection()
    const description = req.body.description
    const image_url = req.body.image_url
    const url = req.body.url
    const email = req.session.whoami
    const addImg = await dbModel.addImg(description, image_url, url)
    res.redirect("/posts")
    connection.release()
})
router.get("/", async (req, res) => {
    const connection = await database.getConnection()
    const email = req.session.whoami
    const user = await dbModel.getUser(email)
    const Imgs = await dbModel.getImgs()
    res.render("post", { Imgs, user });
    connection.release()
})
router.get("/create", async (req, res) => {
    const connection = await database.getConnection()
    const email = req.session.whoami
    const user = await dbModel.getUser(email)
    const Imgs = await dbModel.getImgs()
    res.render("newpost", { Imgs, user });
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

