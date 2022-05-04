const database = require('./databaseConnection');

async function getUsers() {
    const [users] = await database.query("SELECT email FROM foodie_user");
    return users;
}

async function getUser(email) {
    let query = "SELECT * FROM foodie_user WHERE email = :email";
    let params = { email: email }
    const user = await database.query(query, params)
    return user[0][0]
}

async function getPosts() {
    const [imgs] = await database.query("SELECT * FROM posts");
    return imgs;
}

async function getPost(user_id) {
    const query = "SELECT * FROM posts WHERE user_id = :user_id"
    const params = { user_id: user_id }
    const [rows] = await database.query(query, params)
    const img = rows[0]
    return img
}

async function addPost(user_id, image_url) {
    let query = "INSERT INTO posts (user_id, image_url) VALUES(?, ?, ?)"
    const params = [user_id, image_url]
    const [result] = await database.query(query, params)
    return result
}

async function addUser(firtst_name, last_name, email, password) {
    const query = "INSERT INTO foodie_user (first_name, last_name, email, password) VALUES(?, ?, ?, ?)"
    const params = [firtst_name, last_name, email, password]
    const [result] = await database.query(query, params)
    return result
}

async function addcomment(user_id, post_id, comments) {
    const query = "INSERT INTO comments (user_id, post_id, comments) VALUES(?, ?, ?)"
    const params = [user_id, post_id, comments]
    const [result] = await database.query(query, params)
    return result
}

async function getPostComments(post_id) {
    const query =
        "SELECT comment_id, user_id, post_id, comments, (SELECT COUNT(*) FROM comments WHERE post_id = :post_id) AS `totalcomments` FROM comments WHERE post_id = :post_id"
    const params = { post_id: post_id }
    const [rows] = await database.query(query, params)
    const comments = rows[0]
    return comments
}

async function getuserComments(user_id) {
    const query =
        "SELECT comment_id, user_id, post_id, comments, (SELECT COUNT(*) FROM comments WHERE user_id = :user_id) AS `totalcomments` FROM comments WHERE user_id = :user_id";
    const params = { user_id: user_id }
    const [rows] = await database.query(query, params)
    const comments = rows[0]
    return comments
}

async function addLikes(user_id, post_id, comment_id, likes) {
    const query = "INSERT INTO likes (user_id, post_id, comment_id, likes) VALUES(?, ?, ?, ?)"
    const params = [user_id, post_id, comment_id, likes]
    const [result] = await database.query(query, params)
    return result
}

async function getLikesByUsers(user_id) {
    const query =
        "SELECT user_id, post_id, comment_id, likes, (SELECT COUNT(*) FROM likes WHERE user_id = :user_id) AS `totallikes` FROM likes WHERE user_id = :user_id";
    const params = { user_id: user_id }
    const [rows] = await database.query(query, params)
    const likes = rows[0]
    return likes
}

async function getLikesByPosts(post_id) {
    const query =
        "SELECT user_id, post_id, comment_id, likes, (SELECT COUNT(*) FROM likes WHERE post_id = :post_id) AS `totallikes` FROM likes WHERE post_id = :post_id";
    const params = { post_id: post_id }
    const [rows] = await database.query(query, params)
    const likes = rows[0]
    return likes
}

async function getLikesForposts(comment_id) {
    const query =
        "SELECT user_id, post_id, comment_id, likes, (SELECT COUNT(*) FROM likes WHERE comment_id = :comment_id) AS `totallikes` FROM likes WHERE comment_id = :comment_id";
    const params = { comment_id: comment_id }
    const [rows] = await database.query(query, params)
    const likes = rows[0]
    return likes
}

async function addRestaurant(user_id) {
    const query = "INSERT INTO restaurant(user_id, name) VALUES (?, ?)"
    const params = [user_id]
    const [result] = await database.query(query, params)
    return result
}

async function getRestaurantName(user_id) {
    const query = "SELECT * FROM restaurant WHERE user_id = :user_id";
    const params = { user_id: user_id }
    const [rows] = await database.query(query, params)
    const likes = rows[0]
    return likes
}
async function getRestaurantName() {
    const [restaurant] = await database.query("SELECT name FROM restaurant");
    return restaurant;
}


module.exports = {
    getUsers, getUser, addUser, addPost, getPost, getPosts, addcomment, getPostComments, getuserComments, addLikes, getLikesByPosts, getLikesByUsers, getLikesForposts, addRestaurant, getRestaurantName
}
