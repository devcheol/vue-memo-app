const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',    // 호스트 주소
    user: 'root',           // mysql user
    password: '1234',       // mysql password
    database: 'memo'         // mysql 데이터베이스
})

// let conn = mysql.createConnection({
//     host: 'localhost',    // 호스트 주소
//     user: 'root',           // mysql user
//     password: '1234',       // mysql password
//     database: 'memo'         // mysql 데이터베이스
// });

module.exports = {
    async run(sql, params) {
        return new Promise((resolve) => {
            try {
                pool.getConnection((err, conn) => {
                    if (err) throw err;
                    conn.query(sql, (err, rows, fields) => {
                        if (err) throw err;
                        conn.release();
                        resolve(rows);
                    })
                })
            } catch (err) {
                console.error("getConn Error" + err)
            }
        })
    }
} 