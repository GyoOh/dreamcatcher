const database = include('/databaseConnection');

const passwordPepper = "SeCretPeppa4MySal+";

function getAllUsers(callback) {
    let sqlQuery = "SELECT users_id, first_name, last_name, email FROM users";
    database.query(sqlQuery, (err, results, fields) => {
        if (err) {
            callback(err, null);
        }
        else {
            console.log(results);
            callback(null, results);
        }
    });
}
function getUser(id) {
    let query = `SELECT * FROM users WHERE uesrs_id = ?`;
    const [rows] = database.query(query, [id]);
    const user = rows[0];
    console.log(user);
    return user;
}

function addUser(postData, callback) {
    let sqlInsertSalt = "INSERT INTO users (first_name, last_name, email, password_salt) VALUES (:first_name, :last_name, :email, sha2(UUID(),512));";
    let params = {
        first_name: postData.first_name,
        last_name: postData.last_name,
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
            let updatePasswordHash = "UPDATE users SET password_hash = sha2(concat(:password,:pepper,password_salt),512) WHERE users_id = :userId;"
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
                }
                else {
                    console.log(results);
                    callback(null, results);
                }
            });
        }
    });
}

function deleteUser(webUserId, callback) {
    let sqlDeleteUser = "DELETE FROM users WHERE users_id = :userID";
    let params = {
        userID: webUserId
    };
    console.log(sqlDeleteUser);
    database.query(sqlDeleteUser, params, (err, results, fields) => {
        if (err) {
            callback(err, null);
        }
        else {
            console.log(results);
            callback(null, results);
        }
    });
}

module.exports = { getAllUsers, getUser, addUser, deleteUser }
