const pool = require('../sql/pool');
const router = require('koa-router')();

router.prefix('/extension');

router.get('/', (ctx, next) => {
  ctx.body = 'this is a users response!';
});

router.get('/lines', async (ctx, next) => {
  try {
    const userSQL = pool.format('SELECT * FROM codeline')
    const [rows] = await pool.query(userSQL)
    let aiLines = 0;
    let allLines = 0;
    rows.forEach(item => {
      aiLines += item.aiCodeLine;
      allLines += item.allCodeLine;
    })
    await ctx.render('lines', {
      title: '代码行数统计',
      aiLines,
      allLines
    });
  } catch (e) {
    ctx.body = e
  }
});

router.post('/uploadCodeLine', async (ctx, next) => {
  const { aiCodeLine, allCodeLine } = ctx.request.body;

  if (!(aiCodeLine && allCodeLine)) {
    ctx.body = '缺少参数';
    return;
  }

  // 获取MySQL连接
  const conn = await pool.getConnection();

  try {
    await conn.beginTransaction();

    const sql = 'INSERT INTO codeline (aiCodeLine, allCodeLine) VALUES (?, ?)';
    const [result] = await conn.query(sql, [aiCodeLine, allCodeLine]);

    await conn.commit();
    ctx.body = `增加用户成功，id：${result.insertId}`;
  } catch (e) {
    await conn.rollback();
    ctx.body = e.toString();
  } finally {
    conn.release();
  }
});

module.exports = router;