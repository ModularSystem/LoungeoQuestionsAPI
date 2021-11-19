// const fs = require('fs');
// const fastcsv = require('fast-csv');
// const { Pool, Client } = require('pg');

// const credentials = {
//   user: 'postgres',
//   host: 'localhost',
//   database: 'qanda',
//   password: 'vicfirthh11',
//   port: 5432,
// };

// const importQuestions = () => {
//   const stream = fs.createReadStream('csv/questionsCSV.csv');
//   const csvData = [];
//   const csvStream = fastcsv
//     .parse()
//     .on('data', (data) => {
//       // console.log('hi')
//       csvData.push(data);
//     })
//     .on('end', () => {
//       csvData.shift();
//       // console.log(csvData)
//       csvData.forEach((e) => importQuestion(e));
//     });
//   stream.pipe(csvStream);
// };

// async function importQuestion(values) {
//   let userId;
//   const pool = new Pool(credentials);
//   const [id, productId, body, date, name, email, reported, helpful] = values;
//   try {
//     await pool.query(`
//       INSERT INTO users(email) VALUES ('${email}') RETURNING user_id;
//     `);
//   } catch (e) { console.log(e); }

//   const userReturn = await pool.query(`SELECT user_id FROM users WHERE email = '${email}' `);
//   userId = userReturn.rows[0].user_id;

//   try {
//     const questionReturn = await pool.query(`
//       INSERT INTO questions
// (question_id,question_body,question_date,asker_name,user_id,question_helpfulness,
// reported, product_id)
//       VALUES (${id}, '${body}',
//  (to_timestamp(${date}/ 1000.0)), '${name}',${userId}, ${helpful}, ${reported}, ${productId})
//     `);
//   } catch (e) { console.log(e); }
//   await pool.end();
// }

// importQuestions();
