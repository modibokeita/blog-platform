import mysql from "mysql";

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Keita@1234',
    database: 'library',
})

export default db;
