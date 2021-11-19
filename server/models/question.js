

module.exports = {




select: async (client, params) => {
  const {product_id, count} = params;
  const result = await client.query(`
  SELECT *, (
    SELECT json_agg(x) FROM (
      SELECT * FROM answers WHERE answers.question_id = questions.question_id
    ) x
  ) answers FROM QUESTIONS WHERE product_id = ${product_id} LIMIT ${count}
  `)
  .catch( e => console.log(e))
  // console.log(result.rows[0])
  const filtered = result.rows.filter( q => !q.reported)
  filtered.forEach( question => {
    question.question_date = new Date(Number(question.question_date))
    const filteredAnswers = question.answers.filter( answer => !answer.reported)
     filteredAnswers.forEach( answer => {
      answer.date = new Date(Number(answer.date))
    })
    let answerObj = {};
    filteredAnswers.forEach( answer => answerObj[answer.id] = answer)
    question.answers = answerObj;
  })

  return result.rows
},

////DONE WITH PROMISES
// select: async (client, params, cb) => {
//   const {product_id, count} = params;
//   const result = await client.query(`SELECT * FROM QUESTIONS WHERE product_id = ${product_id} LIMIT ${count}`);
//   Promise.all(result.rows.map( async (question) => {
//     const answers = await client.query(`SELECT * FROM ANSWERS WHERE question_id = ${question.question_id}`);
//     let filtered = answers.rows.filter( answer => !answer.reported)
//     filtered = filtered.map( answer => {
//       answer.date = new Date(Number(answer.date))
//       return answer;
//     })
//     let answerObj = {};
//     filtered.forEach( answer => answerObj[answer.id] = answer)
//     question.answers = answerObj;
//     return question
//   }))
//   .then((data) => {
//     cb(data)
//   })
// },

insert: async (client, params) => {
  const { body, name, email, product_id } = params;

  const question_date = new Date().getTime();
  const result = await client.query(`INSERT INTO questions(product_id, question_body, question_date, name, email) VALUES (${product_id}, '${body}',${question_date}, '${name}', '${email}')`)
  .catch( console.log)
  console.log('try here', result)
}

}