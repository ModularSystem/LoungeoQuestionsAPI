const pool = require('../poolConfig');

module.exports = {

  select: async (params) => {
    const { productID, count, offset } = params;
    const result = await pool.query(`
      SELECT
        question_id,
        product_id,
        question_body,
        to_timestamp(question_date/1000) as question_date,
        name,
        email,
        question_helpfulness,
        (
          SELECT json_object_agg(id, answer) FROM (
            SELECT
              id,
              body,
              to_timestamp(date/1000) as date,
              answerer_name,
              reported,
              helpfulness

             FROM answers WHERE answers.question_id = questions.question_id AND reported = 0
           ) as answer
      ) as answers FROM QUESTIONS WHERE product_id = ${productID} AND reported = 0 LIMIT ${count} OFFSET ${offset}
      `)
      .catch((e) => e);
    if (result.rows) { result.rows.forEach((q) => { if (!q.answers) q.answers = {}; }); }
    if (result instanceof Error) { return result; }
    return result.rows;
  },

  /// /DONE WITH PROMISES
  // select: async (client, params, cb) => {
  //   const {product_id, count} = params;
  //   const result = await client.query(
  // `SELECT * FROM QUESTIONS WHERE product_id = ${product_id} LIMIT ${count}`);
  //   Promise.all(result.rows.map( async (question) => {
  //     const answers = await client.query(
  // `SELECT * FROM ANSWERS WHERE question_id = ${question.question_id}`);
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

  insert: async (params) => {
    const {
      body, name, email, productID,
    } = params;

    const questionDate = new Date().getTime();
    const result = await pool.query(
      `INSERT INTO questions(product_id, question_body, question_date, name, email) VALUES (${productID}, '${body}',${questionDate}, '${name}', '${email}')
      `,
    )
      .catch((e) => e);
    return result;
  },

  report: async (id) => {
    const result = await pool.query(`
      UPDATE questions SET reported = 1 where question_id = ${id}
    `);
    return result;
  },

  helpful: async (id) => {
    const result = await pool.query(`
    UPDATE questions SET question_helpfulness = question_helpfulness+1 where question_id = ${id}
  `);
    return result;
  },

};
