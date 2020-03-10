const url = require('url')
let detail = async (ctx, next) => {
    console.log(url.parse(ctx.request.url, true).query)
}
let add = async (ctx, next) => {
    let name = ctx.request.body.name || ''
    let sex = ctx.request.body.sex || ''
    console.log(name, sex)
}
let update = async (ctx, next) => {
    let id = ctx.request.body.id || ''
    let name = ctx.request.body.name || ''
    let sex = ctx.request.body.sex || ''
    console.log(id, name, sex)
}
let Delete = async (ctx, next) => {
    console.log(url.parse(ctx.request.url, true).query)
}
// router.get('/hello/:name', async (ctx, next) => {
//     let name = ctx.params.name
//     ctx.response.body = `<h1>Hello ${name}</h1>`
// })
module.exports = {
    'get,/device': detail,
    'post,/device': add,
    'put,/device': update,
    'delete,/device': Delete
}