const express = require('express')
const app = express()

app.get('/', (req, res) => {
  res.send({
    "status": "ok"
  })
})

app.listen(3000, () => {
  console.log('Start server at port 3000.')
})
