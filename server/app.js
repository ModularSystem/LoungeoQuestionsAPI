const express = require('express');
const path = require('path');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const { question, answer } = require('./models');

app.get('/loaderio-0f17028868e34d7bd1b89796b40b85c3.txt', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/loaderio-0f17028868e34d7bd1b89796b40b85c3.txt'))
});

app.get('/qa/questions', async (req, res) => {
  const { product_id: productID } = req.query;
  let { count, page } = req.query;
  count = count || 5;
  page = page || 1;
  console.log('working')
  const offset = count * (page - 1);
  try {
    const results = await question.select({ productID, count, offset });

    const responseObj = {
      productID,
      results: results.rows,
    };
    res.status(200).send(responseObj);
  } catch (e) {
    console.log(e)
    res.status(404).send();
  }
});

app.post('/qa/questions', async (req, res) => {
  try {
    await question.insert(req.body);
    res.status(201).send();
  } catch (e) {
    res.status(409).send();
  }
});

app.get('/qa/questions/:question_id/answers', async (req, res) => {
  const { question_id: questionID } = req.params;
  let { page, count } = req.query;
  page = page || 1;
  count = count || 5;
  const offset = count * (page - 1);
  const params = {
    questionID, page, count, offset,
  };
  try {
    const answers = await answer.select(params);
    res.status(200).send(answers.rows);
  } catch (e) {
    res.status(404).send();
  }
});

app.post('/qa/questions/:question_id/answers', async (req, res) => {
  const { question_id: questionID } = req.params;
  const params = { questionID, ...req.body };
  try {
    await answer.insert(params);
    res.status(201).send();
  } catch (e) {
    res.status(409).send();
  }
});

app.put('/qa/questions/:question_id/helpful', async (req, res) => {
  const { question_id: questionID } = req.params;
  try {
    await question.helpful(questionID);
    res.status(204).send();
  } catch (e) {
    res.status(400).send();
  }
});

app.put('/qa/questions/:question_id/report', async (req, res) => {
  const { question_id: questionID } = req.params;
  try {
    await question.report(questionID);
    res.status(204).send();
  } catch (e) {
    res.status(400).send();
  }
});

app.put('/qa/answers/:answer_id/helpful', async (req, res) => {
  const { answer_id: answerID } = req.params;
  try {
    await answer.helpful(answerID);
    res.status(204).send();
  } catch (e) {
    res.status(400).send();
  }
});

app.put('/qa/answers/:answer_id/report', async (req, res) => {
  const { answer_id: answerID } = req.params;
  try {
    await answer.report(answerID);
    res.status(204).send();
  } catch (e) {
    res.status(400).send();
  }
});

module.exports = app;
