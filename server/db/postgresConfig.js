const { Pool, Client } = require('pg');

const credentials = {
  user: 'postgres',
  host: 'localhost',
  database: 'qanda',
  password: 'vicfirthh11',
  port: 5432,
};

async function query() {
  const pool = new Pool(credentials);
  await pool.query('');

  await pool.end();
}

module.exports = query;

// insert into questions ( question_body, asker_name, product_id) values ( 'it was good', 'adam', 3)
