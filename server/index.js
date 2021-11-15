const app = require('./app.js')
const port = 8080;

app.listen(port, ()=> {
  console.log(`Questions and Answers API running on ${port}`)
})