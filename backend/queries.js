const Pool = require('pg').Pool;
const pool = new Pool({
  user: 'admin',
  host: 'localhost',
  database: 'api',
  password: 'password',
  port: 5432,
});

const getGoals = (request, response) => {
  pool.query('SELECT * FROM goals ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

module.exports = {
  getGoals,
};
