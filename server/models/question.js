const pool = require('../db/poolConfig');

module.exports = {

  select: (params) => {
    const { productID, count, offset } = params;

    return pool.query(`
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
      `);
  },

  // / /DONE WITH PROMISES
  // select: async (params) => {
  //   const { productID, count } = params;
  //   const result = await pool.query(
  //     `SELECT * FROM QUESTIONS WHERE product_id = ${productID} LIMIT ${count}`,
  //   );
  //   return Promise.all(result.rows.map(async (question) => {
  //     const answers = await pool.query(
  //       `SELECT
  //       id,
  //         body,
  //         to_timestamp(date/1000) as date,
  //         answerer_name,
  //         reported,
  //         helpfulness
  //        FROM ANSWERS WHERE question_id = ${question.question_id} AND reported = 0`,
  //     );
  //     await Promise.all(answers.rows.map(async (answer) => {
  //       const photos = await pool.query(
  //         `SELECT * FROM answer_photos WHERE answer_id = ${answer.id} `,
  //       );
  //       answer.photos = photos.rows;
  //       // answer.photos = photos;
  //     }));
  //     const answerObj = {};
  //     answers.rows.forEach((answer) => { answerObj[answer.id] = answer; });
  //     question.answers = answerObj;
  //     return question;
  //   }));
  // },

  insert: (params) => {
    const {
      body, name, email, productID,
    } = params;
    const questionDate = new Date().getTime();
    return pool.query(
      `INSERT INTO questions(product_id, question_body, question_date, name, email) VALUES (${productID}, '${body}',${questionDate}, '${name}', '${email}')
      `,
    );
  },

  report: (id) => pool.query(`
      UPDATE questions SET reported = 1 where question_id = ${id}
    `),

  helpful: (id) => pool.query(`
    UPDATE questions SET question_helpfulness = question_helpfulness+1 where question_id = ${id}
  `),

};
