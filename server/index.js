const app = require('./app');

const port = 3000;
// const postgresConfig = require('./db/poolConfig');

if (require.main === module) {
  app.listen(port, () => {
    console.log(`Questions and Answers API running on ${port}`);
  });
}
