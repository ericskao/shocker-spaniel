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
app.get('/goals', db.getGoals);
app.post('/goals', db.createGoal);

console.log('here');

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
