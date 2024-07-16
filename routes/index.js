const router = require('koa-router')()

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

// http://localhost:3000/get?size=100
router.get('/get', async (ctx, next) => {
  const { size } = ctx.query
  ctx.body = `您的size参数是${size}`
})

// http://localhost:3000/get/koa
router.get('/get/:id', async (ctx, next) => {
  const { id } = ctx.params
  ctx.body = `您的id参数是${id}`
})

router.post('/juejin', async (ctx, next) => {
  const { name, id } = ctx.request.body
  ctx.body = {
    name:`您的用户名是${name}`,
    id: `${id}`,
  }
})

module.exports = router
