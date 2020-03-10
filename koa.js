const Koa = require('koa')
const router = require('koa-router')()
const bodyParser = require('koa-bodyparser')
const cors = require('koa2-cors');
const controller = require('./controller')
const app = new Koa()
app.use(async (ctx, next) => {
    console.log(ctx.request.method, ctx.request.url)
    await next()
})
controller(router)

app.use(cors()) // 实现跨域
app.use(bodyParser());// koa-bodyparser必须在router之前被注册到app对象上
app.use(router.routes())
app.listen(3000)
console.log('http://127.0.0.1:3000')

// router.get('/', async (ctx, next) => {
//     ctx.response.body = `<h1>Home</h1>
//     <form action="/login" method="post">
//     <p>name:<input name="name" value=""></p>
//     <p>password:<input name="password" type="password"></p>
//     <p><input type="submit" value="Submit"></p>
//     </form>`
// })
// router.post('/login', async (ctx, next) => {
//     let name = ctx.request.body.name || ''
//     let password = ctx.request.body.password || ''
//     if (name === 'lpr' && password === '123456') {
//         ctx.response.body = `<h1>Hello lpr</h1>`
//     } else {
//         ctx.response.body = `Error`
//     }
// })
router.get('/login', async (ctx, next) => {
    ctx.response.body = `test`
})