const { Pool } = require('pg');

const credentials = {
  user: 'postgres',
  host: 'ec2-18-117-142-193.us-east-2.compute.amazonaws.com',
  database: 'qanda',
  password: '12345',
  port: 5432,
};
const pool = new Pool(credentials);

module.exports = pool;
