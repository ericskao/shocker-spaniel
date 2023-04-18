const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3001;
const db = require('./queries.js');

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

app.get('/', (req, res) => {
  res.json({ message: 'Hello from Express!' });
});

// Get today's Goals
app.get('/goals', db.getGoals);

// Create a Goal
app.post('/goals', db.createGoal);

// Update a Goal
app.put('/goals/:id', db.updateGoal);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
