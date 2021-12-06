const pool = require('../db/poolConfig');

module.exports = {
  select: (params) => {
    const { questionID, count, offset } = params;
    return pool.query(`SELECT *,  (
      SELECT json_agg(photo) FROM (
        SELECT *

         FROM answer_photos WHERE answers.id = answer_photos.photo_id
       ) as photo
  ) as photos
    FROM answers WHERE question_id = ${questionID} LIMIT ${count} OFFSET ${offset}`);
  },

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
