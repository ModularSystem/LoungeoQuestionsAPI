const pool = require('../poolConfig');

module.exports = {

  select: async (params) => {
    const { questionID, count, offset } = params;
    const result = await pool.query(`SELECT * FROM answers WHERE question_id = ${questionID} LIMIT ${count} OFFSET ${offset}`)
      .catch((e) => { throw e; });
    return result.rows;
  },

  insert: async (params) => {
    const {
      body, name, email, questionID,
    } = params;
    const date = new Date().getTime();
    const result = await pool.query(`INSERT INTO answers (question_id, body, answerer_name, email, date) VALUES (${questionID}, '${body}','${name}', '${email}', ${date} )`)
      .catch((e) => { throw e; });

    return result;
  },

  report: async (id) => {
    const result = await pool.query(`
      UPDATE answers SET reported = 1 where id = ${id}
    `)
      .catch((e) => { throw e; });
    return result;
  },

  helpful: async (id) => {
    const result = await pool.query(`
      UPDATE answers SET helpfulness = helpfulness+1 where id = ${id}
    `)
      .catch((e) => { throw e; });
    return result;
  },

};
