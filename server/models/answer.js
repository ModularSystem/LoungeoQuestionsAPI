const pool = require('../db/poolConfig');

module.exports = {
  ///// PROMISES
  select: async (params) => {
    const { questionID, count, offset } = params;
    const result = await pool.query(`SELECT * FROM answers WHERE question_id = ${questionID} LIMIT ${count} OFFSET ${offset}`);
    return Promise.all(result.rows.map(async (answer) => {
      const photos = await pool.query(
        `SELECT * FROM answer_photos WHERE answer_id = ${answer.id}`,
      );
      answer.photos = photos.rows;
      return answer;
    }));
  },
  /// JSON AGG
  // select: (params) => {
  //   const { questionID, count, offset } = params;
  //   return pool.query(`SELECT *,  (
  //     SELECT json_agg(photo) FROM (
  //       SELECT *

  //        FROM answer_photos WHERE answers.id = answer_photos.photo_id
  //      ) as photo
  // ) as photos
  //   FROM answers WHERE question_id = ${questionID} LIMIT ${count} OFFSET ${offset}`);
  // },

  insert: (params) => {
    const {
      body, name, email, questionID,
    } = params;
    const date = new Date().getTime();
    return pool.query(`INSERT INTO answers (question_id, body, answerer_name, email, date) VALUES (${questionID}, '${body}','${name}', '${email}', ${date} )`);
  },

  report: (id) => pool.query(`
      UPDATE answers SET reported = 1 where id = ${id}
    `),

  helpful: (id) => pool.query(`
      UPDATE answers SET helpfulness = helpfulness+1 where id = ${id}
    `),

};
