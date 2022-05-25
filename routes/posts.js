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

const fetch = require('node-fetch');
const { resolveSoa } = require("dns");

router.post("/create", upload.single("image"), async (req, res) => {
    const connection = await database.getConnection()
    const user = await dbModel.getUser(req.session.whoami)
    const term = req.body.term
    let url_api = `https://api.yelp.com/v3/businesses/search?term=${term}&latitude=49.2827&longitude=-123.1207`
    let header = {
        "method": "POST",
        "Authorization": `Bearer ROF0HVCZJhK3MOwM_BdaB_bIodzpNbWdhHMDsXZxF7bRg35xwwQRscs_ZJQdV7HKKonIdb5iyHpfY-sabDbugiUfBkDDg4tVymAhpAx7Rs8ratmrpPnMW3hqMtSJYnYx`,
    }
    const request = {
        headers: header
    }
    fetch(url_api, request)
        .then(res => res.json())
        .then(data => {
            let [business] = data.businesses
            let name = business.name
            if (business == null) {
                res.render("newpost", {
                    address: null
                })
            } else {
                let [business] = data.businesses
                let name = business.name
                let address = business.location
                let display_address = address.display_address
                res.render("newpost", { name, user, display_address })
            }
        })
    const { filename, path } = req.file
    const description = req.body.description
    const url = await s3.uploadFile(req.file)
    const image_url = `https://direct-upload-s3-bucket-idsp.s3.us-west-2.amazonaws.com/${url.Key}`
    await dbModel.addPost(user.user_id, description, image_url)
    res.redirect("/posts")
    connection.release()
})
router.post("/create/restaurant", upload.single("image"), async (req, res) => {
    const connection = await database.getConnection()
    const user = await dbModel.getUser(req.session.whoami)
    const term = req.body.term
    let url_api = `https://api.yelp.com/v3/businesses/search?term=${term}&latitude=49.2827&longitude=-123.1207`
    let header = {
        "method": "POST",
        "Authorization": `Bearer ROF0HVCZJhK3MOwM_BdaB_bIodzpNbWdhHMDsXZxF7bRg35xwwQRscs_ZJQdV7HKKonIdb5iyHpfY-sabDbugiUfBkDDg4tVymAhpAx7Rs8ratmrpPnMW3hqMtSJYnYx`,
    }
    const request = {
        headers: header
    }
    fetch(url_api, request)
        .then(res => res.json())
        .then(data => {
            let [business] = data.businesses
            if (business == null) {
                res.render("newpost", {
                    address: null
                })
            } else {
                let [business] = data.businesses
                let name = business.name
                let address = business.location
                let display_address = address.display_address
                res.json({ name, user, display_address })
            }
        })
})

router.get("/create", async (req, res) => {
    const user = await dbModel.getUser(req.session.whoami)
    const users = await dbModel.getUsers()
    if (!user) {
        return res.redirect("/authentication/403");
    }
    const posts = await dbModel.getPosts()
    res.render("newpost", { posts, user, users, name: null });
})

router.get("/", async (req, res) => {
    const user = await dbModel.getUser(req.session.whoami)
    const users = await dbModel.getUsers()
    let posts = await dbModel.getPosts()
    let userPosts
    if (!user) {
        return res.redirect("/authentication/403");
    }
    if (user) {
        userPosts = await dbModel.getUserPosts(user.user_id)
    }
    const commentId = await dbModel.getComments()
    res.render("post", { user, users, posts, userPosts, commentId });
})

router.post("/:post_id/comment", async (req, res) => {
    const user = await dbModel.getUser(req.session.whoami)
    const post_id = +req.params.post_id
    if (user) {
        const comments = req.body.comments
        await dbModel.addcomment(user.user_id, req.body.post_id, comments)
        let posts = await dbModel.getPosts()
        let [thisPost] = posts.filter(post => post.post_id === post_id)
        res.json({ count: thisPost.total_comments })
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

router.get("/edit/:postid", async (req, res) => {
    const user = await dbModel.getUser(req.session.whoami)
    if (!user) {
        return res.redirect("/authentication/403");
    }
    const post = await dbModel.getPostByPostId(req.params.postid)
    const postId = req.params.postid
    if (post[0].user_id !== user.user_id) {
        res.redirect("/authentication/403")
    }
    res.render("edit", { user, post, postId });
})

router.post("/edit/:postid", upload.single("image"), async (req, res) => {
    // let new_image = ""
    const posts = await dbModel.getPostByPostId(req.params.postid)
    const user = await dbModel.getUser(req.session.whoami)
    if (posts && posts[0].user_id == user.user_id) {
        const { filename, path } = req.file
        const description = req.body.description
        const url = await s3.uploadFile(req.file)
        const image_url = `https://direct-upload-s3-bucket-idsp.s3.us-west-2.amazonaws.com/${url.Key}`
        await dbModel.updatePost(description, image_url, parseInt(req.params.postid))
        res.redirect("/posts")
    } else {
        // new_image = req.body.old_image
    }
});

router.post("/deletePost", async (req, res) => {
    const id = +req.query.id
    const post = await dbModel.getPostByPostId(id)
    const user = await dbModel.getUser(req.session.whoami)
    if (post[0].user_id === user.user_id) {
        await dbModel.deletePost(id)
        console.log("Deleting... ")
        res.redirect(`/posts/${post[0].post_id}`)
    } else {
        console.log("User do not match post user ")
        res.sendStatus(403);
    }
})

router.get("/location", async (req, res) => {
    res.render("location");
})

router.post("/yelp", async (req, res) => {
    let latitude = req.query.latitude
    let longitude = req.query.longitude
    let url = `https://api.yelp.com/v3/businesses/search?latitude=${latitude}&longitude=${longitude}&radius=40000`
    let options = {
        'headers': {
            'x-api-key': 'I4VPC2nHPKjXgSkG2406XTkcgKtB42TNNBa_WF38qTdb9lERIdrZeqkkYsdwNgfooicoEbw_BMg6EtISWqQ2ogJdjQmp4sITejk6FRz8vYSQd79hep_YC9Fj68SJYnYx',
            'Authorization': 'Bearer I4VPC2nHPKjXgSkG2406XTkcgKtB42TNNBa_WF38qTdb9lERIdrZeqkkYsdwNgfooicoEbw_BMg6EtISWqQ2ogJdjQmp4sITejk6FRz8vYSQd79hep_YC9Fj68SJYnYx'
        }
    };
    await fetch(url, options)
        .then(a => a.json())
        .then(data => {
            console.log(data)
            res.send(data)


        });
})


router.get("/food", async (req, res) => {
    const user = await dbModel.getUser(req.session.whoami)
    const thisUser = await dbModel.getPostByUserId(user.user_id)
    res.render("food", { user, thisUser })
})

router.use((err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }
    console.error(err);
    res.status(500).send({ error: "something bad happened" });
});

module.exports = router;