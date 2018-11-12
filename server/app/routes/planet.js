const Router = require('express-promise-router');

const pool = require('../pg/conn');
const router = new Router();

router.get('/:name', async (req, res) => {
  const { name } = req.params;
  pool.query('SELECT * FROM planet WHERE name = $1', [name], (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
});

module.exports = router;
