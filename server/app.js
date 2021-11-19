const express = require('express');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const { question, answer } = require('./models');

app.get('/', (req, res) => {
  res.send('Get');
});

app.post('/', (req, res) => {
  // console.log(req.body);
  res.send('Post');
});

app.get('/qa/questions', async (req, res) => {
  const { product_id: productID } = req.query;
  let { count, page } = req.query;
  count = count || 5;
  page = page || 1;
  const offset = count * (page - 1);

  const results = await question.select({ productID, count, offset });
  if (results instanceof Error) {
    // console.log(results)
    res.status(404).send();
  } else {
    const responseObj = {
      productID,
      results,
    };
    // console.log(responseObj.results)
    res.status(200).send(responseObj);
  }
});

app.post('/qa/questions', async (req, res) => {
  const result = await question.insert(req.body);
  if (result instanceof Error) {
    res.status(409).send();
  } else {
    res.status(201).send();
  }
});

app.get('/qa/questions/:question_id/answers', async (req, res) => {
  const { question_id: questionID } = req.params;
  const params = { questionID, ...req.body };
  const result = await answer.select(params);
  if (result instanceof Error) {
    res.status(404).send();
  } else {
    res.status(200).send();
  }
});

app.post('/qa/questions/:question_id/answers', async (req, res) => {
  const { question_id: questionID } = req.params;
  let { page, count } = req.query;
  page = page || 1;
  count = count || 5;
  const offset = count * (page - 1) + 1;
  const params = {
    questionID, page, count, offset,
  };
  const result = await answer.insert(params);
  if (result instanceof Error) {
    res.status(409).send();
  } else {
    res.status(201).send();
  }
});

app.put('/qa/questions/:question_id/helpful', async (req, res) => {
  const { question_id: questionID } = req.params;
  const result = await question.helpful(questionID);
  if (result instanceof Error) {
    res.status(409).send();
  } else {
    res.status(200).send();
  }
});

app.put('/qa/questions/:question_id/report', async (req, res) => {
  const { question_id: questionID } = req.params;
  const result = await question.report(questionID);
  if (result instanceof Error) {
    res.status(409).send();
  } else {
    res.status(200).send();
  }
});

app.put('/qa/answers/:answer_id/helpful', async (req, res) => {
  const { answer_id: answerID } = req.params;
  const result = await answer.helpful(answerID);
  if (result instanceof Error) {
    res.status(409).send();
  } else {
    res.status(200).send();
  }
});

app.put('/qa/answers/:answer_id/report', async (req, res) => {
  const { answer_id: answerID } = req.params;
  const result = await answer.report(answerID);
  if (result instanceof Error) {
    res.status(409).send();
  } else {
    res.status(200).send();
  }
});

module.exports = app;
