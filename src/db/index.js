const mysql = require('mysql2/promise')

const connection = mysql.createPool({
    host: "",
    user: "root",
    password: "",
    database: "chill_movie",
    waitForConnections: true,
    connectionLimit: 10,
})

module.exports = connection