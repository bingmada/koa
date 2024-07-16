/*
 * @Author: liyingda
 * @Date: 2024-07-16 21:04:09
 * @LastEditors: liyingda
 * @LastEditTime: 2024-07-16 21:16:45
 * @Description: 
 */
const mysql = require('mysql2')

// 注意修改成你的连接信息
const config = {
  database: 'koadb',  // 数据库
  username: 'root',   // 用户
  password: '000000', // 密码
  port: '3306',       // MySQL端口号
  host: 'localhost'   // MySQL地址
}

const pool = mysql.createPool(config)

module.exports = pool