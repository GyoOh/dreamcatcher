const database = require('./databaseConnection');

async function getUsers() {
    const [users] = await database.query("SELECT * FROM foodie_user");
    return users;
}

async function getUser(email) {
    let query = "SELECT * FROM foodie_user WHERE email = :email";
    let params = { email: email }
    const [user] = await database.query(query, params)
    return user[0]
}
async function getUserbyUserId(user_id) {
    let query = "SELECT * FROM foodie_user WHERE user_id = :user_id";
    let params = { user_id: user_id }
    const [user] = await database.query(query, params)
    return user[0]
}

async function deleteUser(email) {
    let query = "DELETE FROM foodie_user WHERE email = :email";
    let params = { email: email }
    const [user] = await database.query(query, params)
    return user[0]
}

async function getPosts() {
    let query = `
    select posts.*, comments.comments as comments 
    from posts 
    left join comments on comments.post_id = posts.post_id 
    order by comments.comment_id asc;
    `
    const [posts] = await database.query(query);
    return posts;
}

async function addPost(user_id, description, image_url) {
    let query = "INSERT INTO posts (user_id, description, image_url) VALUES(?, ?, ?)"
    const params = [user_id, description, image_url]
    const [result] = await database.query(query, params)
    return result
}
async function deletePost(post_id) {
    let query = "DELETE FROM posts WHERE post_id = :post_id";
    let params = { post_id: post_id }
    const [user] = await database.query(query, params)
    return user[0]
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

async function deletecomment(comment_id) {
    let query = "DELETE FROM comments WHERE comment_id = :comment_id";
    let params = { comment_id: comment_id }
    const [user] = await database.query(query, params)
    return user[0]
}

async function getCommentsLikes(comment_id) {
    const query =
        "SELECT comment_id, user_id, post_id, comments, (SELECT COUNT(*) FROM likes WHERE comment_id = :comment_id) AS `totalcomments` FROM comments WHERE comment_id = :comment_id"
    const params = { comment_id: comment_id }
    const [rows] = await database.query(query, params)
    const comments = rows[0]
    return comments
}
async function getCommentsFromComment(comment_id) {
    const query =
        "SELECT comment_id, user_id, post_id, comments, (SELECT COUNT(*) FROM comments WHERE comment_id = :comment_id) AS `totalcomments` FROM comments WHERE comment_id = :comment_id"
    const params = { comment_id: comment_id }
    const [rows] = await database.query(query, params)
    const comments = rows
    return comments
}

async function getCommentByUser(user_id) {
    const query =
        "SELECT comment_id, user_id, post_id, comments, (SELECT COUNT(*) FROM comments WHERE user_id = :user_id) AS `totalcomments` FROM comments WHERE user_id = :user_id";
    const params = { user_id: user_id }
    const [rows] = await database.query(query, params)
    const comments = rows
    return comments
}

async function addPostLikes(user_id, post_id) {
    const query = "INSERT INTO post_likes (user_id, post_id) VALUES(?, ?)"
    const params = [user_id, post_id]
    const [result] = await database.query(query, params)
    return result
}
async function deletePostLikes(like_id) {
    let query = "DELETE FROM post_likes WHERE like_id = :like_id";
    let params = { like_id: like_id }
    const [user] = await database.query(query, params)
    return user[0]
}
async function deleteCommentLikes(like_id) {
    let query = "DELETE FROM comment_likes WHERE like_id = :like_id";
    let params = { like_id: like_id }
    const [user] = await database.query(query, params)
    return user[0]
}

async function addCommentsLikes(user_id, post_id, comment_id) {
    const query = "INSERT INTO comment_likes (user_id, post_id, comment_id) VALUES(?, ?, ?)"
    const params = [user_id, post_id, comment_id]
    const [result] = await database.query(query, params)
    return result
}

async function getPostByUserId(user_id) {
    const query =
        "select distinct posts.*, if (post_likes.like_id is not null, 1, 0) as liked_by_current_user from posts left join post_likes on post_likes.post_id = posts.post_id AND post_likes.user_id = :user_id";
    const params = { user_id: user_id }
    const [rows] = await database.query(query, params)
    const likes = rows
    return likes
}
async function getCommentLikesUsers(user_id) {
    const query =
        "SELECT user_id, comment_id, (SELECT COUNT(*) FROM comment_likes WHERE user_id = :user_id) AS `totallikes` FROM comment_likes WHERE user_id = :user_id";
    const params = { user_id: user_id }
    const [rows] = await database.query(query, params)
    const likes = rows
    return likes
}

async function getLikesPosts(post_id) {
    const query =
        "SELECT user_id, post_id, (SELECT COUNT(*) FROM post_likes WHERE post_id = :post_id) AS `totallikes` FROM post_likes WHERE post_id = :post_id";
    const params = { post_id: post_id }
    const [rows] = await database.query(query, params)
    const likes = rows[0]
    return likes
}

async function getLikesComments(comment_id) {
    const query =
        "SELECT user_id, comment_id, (SELECT COUNT(*) FROM comment_likes WHERE comment_id = :comment_id) AS `totallikes` FROM comment_likes WHERE comment_id = :comment_id";
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

async function getRestaurant(user_id) {
    const query = "SELECT * FROM restaurant WHERE user_id = :user_id";
    const params = { user_id: user_id }
    const [rows] = await database.query(query, params)
    const likes = rows[0]
    return likes
}

async function getRestaurantsName() {
    const [restaurant] = await database.query("SELECT name FROM restaurant");
    return restaurant;
}

async function deleteRestaurant(restaurant_id) {
    let query = "DELETE FROM restaurant WHERE restaurant_id = :restaurant_id";
    let params = { restaurant_id: restaurant_id }
    const [user] = await database.query(query, params)
    return user[0]
}

module.exports = {
    getUsers, getUser, addUser, deleteUser, deletePost, deleteRestaurant, deletePostLikes, deleteCommentLikes, deletecomment,
    addPost, getPosts, addcomment, getCommentByUser, addPostLikes, addCommentsLikes, getPostByUserId,
    getLikesPosts, getLikesComments, addRestaurant, getRestaurant, getCommentsFromComment, getCommentsLikes, getRestaurantsName,
    getLikesComments, getCommentLikesUsers, getUserbyUserId
}
