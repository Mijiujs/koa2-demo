const url = require('url')
const DB = require('../DB')
let detail = async (ctx, next) => {
    let sql = 'SELECT * FROM user WHERE id=?'
    let i = url.parse(ctx.request.url, true).query.id
    ctx.body = await DB.q(sql, i)
}
let add = async (ctx, next) => {
    let sql = 'INSERT INTO user (name, sex) VALUES (?, ?)'
    let i = [ctx.request.body.name, ctx.request.body.sex]
    ctx.body = await DB.q(sql, i)
}
let update = async (ctx, next) => {
    let sql = 'UPDATE user SET name = ?,sex=? WHERE id= ?'
    let i = [ctx.request.body.name, ctx.request.body.sex, ctx.request.body.id]
    ctx.body = await DB.q(sql, i)
}
let Delete = async (ctx, next) => {
    let sql = 'DELETE FROM user where id=?'
    let i = url.parse(ctx.request.url, true).query.id
    ctx.body = await DB.q(sql, i)
}
// router.get('/hello/:name', async (ctx, next) => {
//     let name = ctx.params.name
//     ctx.response.body = `<h1>Hello ${name}</h1>`
// })
module.exports = {
    'get,/user': detail,
    'post,/user': add,
    'put,/user': update,
    'delete,/user': Delete
}