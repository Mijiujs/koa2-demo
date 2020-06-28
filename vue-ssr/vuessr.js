const Koa = require('koa')
const router = require('koa-router')()
const bodyParser = require('koa-bodyparser')
const cors = require('koa2-cors');
const Vue = require('vue')
const renderer = require('vue-server-renderer').createRenderer({
    template: require('fs').readFileSync('./index.template.html', 'utf-8')
})
const fs = require('fs')
// const url = require('url')
const app = new Koa()
app.use(cors())
app.use(bodyParser());
app.use(router.routes())
app.listen(3000)
console.log('http://127.0.0.1:3000')
const context = {
    title: '我的SSR页面'
}
router.get('/', async (ctx, next) => {
    console.log(ctx.request.method, ctx.request.url)
    const vueApp = new Vue({
        data: {
            url: ctx.request.url
        },
        template: `<div>Hello World,路径是{{url}}</div>`
    })
    renderer.renderToString(vueApp, context, (err, html) => {
        if (err) {
            ctx.response.status = 500
            console.log(ctx.response)
        }
        ctx.response.body = html
        console.log(ctx.request.url)
    })
})

// const vueApp = new Vue({
//     template: `<div>Hello World</div>`
// })
// const renderer = require('vue-server-renderer').createRenderer()
// renderer.renderToString(vueApp, (err, html) => {
//     if (err) { throw err }
//     console.log(html)
// })
// renderer.renderToString(vueApp).then(html => {
//     console.log(html)
// }).catch(err => {
//     console.log(err)
// })