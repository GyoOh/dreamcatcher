

const database = require("../databaseConnection");


function storeImage(inputValues, callback) {
    const sql = 'INSERT INTO images SET ?';
    database.query(sql, inputValues, function (err, data) {
        if (err) throw err;
    });
    const msg = inputValues + "is uploaded successfully";
    return callback(msg);
}


module.exports = storeImage;
