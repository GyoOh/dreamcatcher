

const database = require("../databaseConnection");


module.exports = {
    storeImage: function (inputValues, callback) {

        // save users data into database
        let sql = 'INSERT INTO images SET ?';
        database.query(sql, inputValues, function (err, data) {
            if (err) throw err;
        });
        let msg = inputValues + "is uploaded successfully";
        return callback(msg)
    }


}
