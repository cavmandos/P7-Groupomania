const mysql = require("mysql");

console.log("Connexion à la base de données...");

const db = mysql.createConnection({
    database: process.env.DATABASE,
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD
});

db.connect(function(error) {
    if(error) throw error;
    console.log("Connecté à la base de donnée !");

    /*db.query("SELECT * FROM users", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
      });*/
});

module.exports = db;