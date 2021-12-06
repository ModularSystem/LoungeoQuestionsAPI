
# Loungeo Questions API

An Express.js and PostgreSQL back end for the Loungeo application, serving the Questions and Answers module of the product overview page.


## API Reference

#### Get questions for product

```http
  GET /qa/questions
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `productId` | `number` | id corresponding to product|
| `count` | `number` | number of results to return|
| `page` | `number` | page of results, length of page being defined by count|

#### Post a new question

```http
  POST /qa/questions
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `productId`      | `number` | id corresponding to product |
| `request body`      | `json` | body, username and email corresponding to question |

#### Get answers for question

```http
  GET /qa/questions/:question_id/answers
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `questionId` | `number` | id corresponding to question|
| `count` | `number` | number of results to return|
| `page` | `number` | page of results, length of page being defined by count|

#### Post a new answer

```http
  POST /qa/questions/:question_id/answers
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `question_id`      | `number` | id corresponding to question |
| `request body`      | `json` | body, username and email corresponding to answer |

#### mark question as helpful

```http
  PUT /qa/questions/:question_id/helpful
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `question_id`      | `number` | id corresponding to question |

#### mark answer as helpful

```http
  PUT /qa/answers/:answer_id/helpful
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `answer_id`      | `number` | id corresponding to answer |

#### report a question

```http
  PUT /qa/questions/:question_id/report
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `question_id`      | `number` | id corresponding to question |

#### report an answer

```http
  PUT /qa/answers/:answer_id/report
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `answer_id`      | `number` | id corresponding to answer |
## Authors

- [@adampjohnson](https://www.github.com/adampjohnson)

