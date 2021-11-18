

module.exports = {

insert: async (client) => {
  const result = await client.query('SELECT * FROM QUESTIONS LIMIT 5');
  return result.rows;
  console.log('question added')
},

delete: () => {
  console.log('question deleted')
}

}