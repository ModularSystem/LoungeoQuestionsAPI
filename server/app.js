const express = require('express');
const {question} = require('./models')
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const { Pool, Client } = require('pg');
const credentials = {
  user: 'postgres',
  host: 'localhost',
  database: 'qanda',
  password: 'vicfirthh11',
  port: 5432,
};
const pool = new Pool(credentials)

app.get('/', (req, res) => {
  res.send('Get');
});

app.post('/', (req, res) => {
  // console.log(req.body);
  res.send('Post');
});


app.get('/qa/questions', async (req, res) => {
  const {product_id, count} = req.query;

  const results = await question.select(pool,{product_id, count})

  const responseObj = {
      product_id,
      results
  }
  res.status(200).send(responseObj)

})

app.post('/qa/questions', async (req, res) => {

  // console.log(req.body)
  await question.insert(pool, req.body)
  // console.log(req.query)

})
module.exports = app;
