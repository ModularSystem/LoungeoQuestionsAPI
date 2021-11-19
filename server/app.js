const express = require('express');
const {question, answer} = require('./models')
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

  if(results instanceof Error ){
    res.status(404).send()
  } else {
    const responseObj = {
        product_id,
        results
    }
    res.status(200).send(responseObj)
  }

})

app.post('/qa/questions', async (req, res) => {
  const result = await question.insert(pool, req.body)
  result instanceof Error ?
    res.status(409).send()
    : res.status(201).send()
})

app.post('/qa/questions/:question_id/answers', async (req, res) => {
  const {question_id} = req.params
  const params = {question_id, ...req.body}
  const result = await answer.insert(pool, params)
  result instanceof Error ?
    res.status(409).send()
    : res.status(201).send()
})

module.exports = app;