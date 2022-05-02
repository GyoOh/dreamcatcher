const database = require('./databaseConnection');

async function getUsers() {
    const [users] = await database.query("SELECT * FROM foodie_user");
    return users;
}
async function getUser(email) {
    let query = `SELECT * FROM foodie_user WHERE email = :email`;
    let params = { email: email }
    const user = await database.query(query, params)
    return user[0][0]
}
async function getPosts() {
    const [imgs] = await database.query("SELECT * FROM posts");
    return imgs;
}
async function getPost(id) {
    const query = `SELECT * FROM posts WHERE post_id = ?`
    const [rows] = await database.query(query, [id])
    const img = rows[0]
    return img
}
async function addPost(user_id, description, image_url) {
    let query = "INSERT INTO posts (user_id, description, image_url) VALUES(?, ?, ?)"
    const params = [user_id, description, image_url]
    const [result] = await database.query(query, params)
    return result
}
async function addUser(firtst_name, last_name, email, password) {
    const query = "INSERT INTO foodie_user (first_name, last_name, email, password) VALUES(?, ?, ?, ?)"
    const params = [firtst_name, last_name, email, password]
    const [result] = await database.query(query, params)
    return result
}

module.exports = { getUsers, getUser, addUser, addPost, getPost, getPosts }
