import express from 'express';
import mysql from 'mysql';

const app = express();
const port = 8800;
const db = mysql.createConnection({
    host: 'localhost',
    username: 'root',
    database: 'blog_post',
})
app.get('/', (req, res) =>{
    res.json("hello world")
})
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
