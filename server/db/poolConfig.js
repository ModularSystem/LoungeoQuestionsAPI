const { Pool } = require('pg');

const credentials = {
  user: 'postgres',
  host: 'localhost',
  database: 'qanda',
  password: '12345',
  port: 5432,
};
const pool = new Pool(credentials);

module.exports = pool;
