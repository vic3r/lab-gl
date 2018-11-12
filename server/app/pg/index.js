const { pool } = require('./conn')

module.exports = {
  query: (text, params) => pool.query(text, params)
}
