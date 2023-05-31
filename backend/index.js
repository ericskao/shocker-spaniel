const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3001;
const cors = require('cors');
const db = require('./queries.js');

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

// CORS
const whitelist = ['http://localhost:3000'];
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};
app.use(cors(corsOptions));

// routes
app.get('/', (req, res) => {
  res.json({ message: 'Hello from Express!' });
});

// Get today's Goals
app.get('/api/goals', db.getGoals);

// Create a Goal
app.post('/api/goals', db.createGoal);

// Update a Goal
app.put('/api/goals/:id', db.updateGoal);

// Delete a Goal
app.delete('/api/goals/:id', db.deleteGoal);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
