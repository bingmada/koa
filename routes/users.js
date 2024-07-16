/*
 * @Author: liyingda
 * @Date: 2024-07-16 20:40:44
 * @LastEditors: liyingda
 * @LastEditTime: 2024-07-16 20:44:02
 * @Description: 
 */
const router = require('koa-router')()

router.prefix('/extension')

router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
})

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})

module.exports = router
