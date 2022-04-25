const mysql = require('mysql2');

const is_heroku = process.env.IS_HEROKU || false;

const dbConfigHeroku = {
    host: "m7az7525jg6ygibs.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
    user: "bylxu7g4xvplzyyy",
    password: "reeyuldx9xt1mum9",
    database: "qfm722hlij5ju2wj",
    multipleStatements: false,
    namedPlaceholders: true
};

const dbConfigLocal = {
    host: "localhost",
    user: "IDSP",
    password: "password",
    database: "IDSP_Dreamcatcher",
    multipleStatements: false,
    namedPlaceholders: true
};

if (is_heroku) {
    var database = mysql.createPool(dbConfigHeroku);
}
else {
    var database = mysql.createPool(dbConfigLocal);
}

module.exports = database;


