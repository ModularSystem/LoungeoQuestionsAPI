const { application } = require('express')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.get('/', (req, res) => {
  res.send('Get')
})

app.post('/', (req, res) => {
  console.log(req.body)
  res.send('Post')
})


module.exports = app