
module.exports = {

select: async (client, params) => {
  const {product_id} = params;
  const result = await client.query(`SELECT * FROM ANSWERS WHERE product_id = ${product_id} LIMIT 10`);
  return result.rows;
  console.log('question added')
},

delete: () => {
  console.log('question deleted')
}

}