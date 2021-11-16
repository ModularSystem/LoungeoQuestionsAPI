const app = require('./app');

const port = 8080;
const poolDemo = require('./db/postgresConfig');

app.listen(port, () => {
  console.log(`Questions and Answers API running on ${port}`);
});

poolDemo();