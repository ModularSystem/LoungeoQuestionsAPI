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
  console.log(req.body);
  res.send('Post');
});

app.get('/questions', async (req, res) => {
  const questions = await question.insert(pool);
  res.status(200).send(questions)
})

module.exports = app;
