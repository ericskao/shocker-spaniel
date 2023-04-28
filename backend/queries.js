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
  pool.query(
    'SELECT * FROM goals WHERE DATE(goals.created_at) = CURRENT_DATE ORDER BY is_primary DESC',
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(humps.camelizeKeys(results.rows));
    },
  );
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
      response.status(201).send(humps.camelizeKeys(results.rows[0]));
    },
  );
};

const updateGoal = (request, response) => {
  const { id } = request.params;
  const { completed, title } = request.body;
  if (request.body.hasOwnProperty('completed')) {
    // check/uncheck goal
    pool.query(
      `UPDATE goals SET completed = ${completed} WHERE goals.id = ${id}`,
      (error, results) => {
        if (error) {
          throw error;
        }
        response.status(200).send();
      },
    );
  } else {
    // updating goal name
    const query = `UPDATE goals SET title = '${title}' WHERE goals.id = ${id}`;
    pool.query(query, (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send();
    });
  }
};

module.exports = {
  getGoals,
  createGoal,
  updateGoal,
};
