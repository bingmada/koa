/*
 * @Author: liyingda
 * @Date: 2024-07-16 20:40:44
 * @LastEditors: liyingda
 * @LastEditTime: 2024-07-16 21:24:44
 * @Description: 
 */
const pool = require('../sql/pool')
const router = require('koa-router')()

router.prefix('/extension')

router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
})

router.get('/lines', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})
router.post('/uploadCodeLine', async (ctx, next) => {
  const { name, password, level } = ctx.request.body
  try {
    if (!(name && password && level)) {
      throw '缺少参数'
    }
    // 获取新id
    const idSQL = 'SELECT	COALESCE( max( id ), 0 ) + 1 id FROM USER'
    const [[{ id }]] = await pool.query(idSQL)
    // 获取MySQL连接
    const conn = await pool.getConnection()
    await conn.beginTransaction()

    const userSQL = pool.format('INSERT INTO USER ( id, name, level ) VALUES( ?, ?, ? )', [id, name, level])

    await conn.query(userSQL)
    // 提交事务
    await conn.commit()
    // 释放MySQL连接
    conn.release()
    ctx.body = `增加用户成功，id：${id}，name:${name}`
  } catch (e) {
    conn.rollback()
    ctx.body = e
  }
})

module.exports = router
