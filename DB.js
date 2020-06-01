let mysql = require('mysql')
let connection = mysql.createConnection({
    host: '',
    user: '',
    password: '',
    database: 'lpr'
});
connection.connect();
connection.q = function (sql, arg) {
    return new Promise((resolve, reject) => {
        connection.query(sql, arg, function (error, results, fields) {
            if (error) {
                reject(error)
            } else {
                resolve(results)
            }
        })
    })
}
module.exports = connection
// 查询
// connection.query('SELECT * FROM user', function (err, results, fields) {
//     if (err) throw err;
//     console.log(JSON.parse(JSON.stringify(results[0])))
// });
// 新增
// let i = ['xyx', 'boy']
// connection.query('INSERT INTO user (name, sex) VALUES (?, ?)', i, function (err, results, fields) {
//     if (err) {
//         console.log(err)
//     } else {
//         console.log(results)
//     }
// });
// 更新
// let i = ['update', 'sex', 2]
// connection.query(`UPDATE user SET name = ?,sex=? WHERE id= ?`, i, function (err, results, fields) {
//     if (err) {
//         console.log(err)
//     } else {
//         console.log(results)
//     }
// });
// 删除
// connection.query(`DELETE FROM user where id=2`, function (err, results, fields) {
//     if (err) {
//         console.log(err)
//     } else {
//         console.log(results)
//     }
// });
// connection.end();