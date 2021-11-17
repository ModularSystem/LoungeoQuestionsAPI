const express = require('express');
const {question} = require('./models')
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Get');
});

app.post('/', (req, res) => {
  console.log(req.body);
  res.send('Post');
});

app.post('/questions', (req, res) => {
  question.insert()
})

module.exports = app;
