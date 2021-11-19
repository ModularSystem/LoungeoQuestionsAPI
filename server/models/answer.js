
module.exports = {

select: async (client, params) => {
  const {product_id} = params;
  const result = await client.query(`SELECT * FROM answers WHERE product_id = ${product_id} LIMIT 10`);
  return result.rows;
},

insert: async (client, params) => {
  const {body, name, email, question_id} = params;
  const result = await client.query(`INSERT INTO answers (question_id, body, answerer_name, email) VALUES (${question_id}, '${body}','${name}', '${email}' )`)
  .catch(e => e)
  return result
},

report: async (client) => {

}

}