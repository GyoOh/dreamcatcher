const database = require('./databaseConnection');
const passwordPepper = "SeCretPeppa4MySal+";

async function getUsers() {
    const [users] = await database.query("SELECT * FROM foodie_user");
    return users;
}

async function getUser(email) {
    let query = `SELECT * FROM foodie_user WHERE email = :email`;
    let params = { email: email }
    const users = await database.query(query, params)
    return users
}
async function getImgs() {
    const [rows] = await database.query("SELECT * FROM posts");
    return rows;
}
async function getImg(id) {
    const query = `SELECT * FROM posts WHERE post_id = ?`
    const [rows] = await database.query(query, [id])
    const img = rows[0]
    return img
}
async function addImg(description, image_url, url) {
    let query = "INSERT INTO posts (description, image_url, url) VALUES(?, ?, ?)"
    const params = [description, image_url, url]
    const [result] = await database.query(query, params)
    return result
}

// need to make async later
function addUser(postData, callback) {
    let sqlInsertSalt = "INSERT INTO foodie_user (email, password_salt) VALUES (:email, sha2(UUID(),512));";
    let params = {
        email: postData.email
    };
    console.log(sqlInsertSalt);
    database.query(sqlInsertSalt, params, (err, results, fields) => {
        if (err) {
            console.log(err);
            callback(err, null);
        }
        else {
            let insertedID = results.insertId;
            let updatePasswordHash = "UPDATE foodie_user SET password_hash = sha2(concat(:password,:pepper,password_salt),512) WHERE user_id = :userId;"
            let params2 = {
                password: postData.password,
                pepper: passwordPepper,
                userId: insertedID
            }
            console.log(updatePasswordHash);
            database.query(updatePasswordHash, params2, (err, results, fields) => {
                if (err) {
                    console.log(err);
                    callback(err, null);
                } else {
                    console.log(results);
                    callback(null, results);
                }
            });
        }
    });
}

function deleteUser(webUserId, callback) {
    let sqlDeleteUser = "DELETE FROM foodie_user WHERE user_id = :userID";
    let params = {
        userID: webUserId
    };
    console.log(sqlDeleteUser);
    database.query(sqlDeleteUser, params, (err, results, fields) => {
        if (err) {
            callback(err, null);
        } else {
            console.log(results);
            callback(null, results);
        }
    });
}

module.exports = { getUsers, getUser, addUser, deleteUser, addImg, getImg, getImgs }
