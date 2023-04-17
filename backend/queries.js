const humps = require('humps');

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
    console.log('get goal results', results);
    response.status(200).send(humps.camelizeKeys(results.rows));
  });
};

const createGoal = (request, response) => {
  const { title, isPrimary } = request.body;
  pool.query(
    'INSERT INTO goals (title, is_primary) VALUES ($1, $2) RETURNING *',
    [title, isPrimary],
    (error, results) => {
      if (error) {
        throw error;
      }
      console.log('goal created', results);
      response.status(201).send(humps.camelizeKeys(results.rows[0]));
    },
  );
};

module.exports = {
  getGoals,
  createGoal,
};
