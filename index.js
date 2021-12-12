import express from 'express'
import bodyParser from 'body-parser'
import conn from './connection.js'
const app = express()

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }))

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  next()
})

app.post('/add', async (req, res) => {
  let {
    std_id,
    name,
    course,
    sem,
    contact_no,
    email,
    evt_name,
    duration,
    date,
    conv_name,
    descr,
  } = req.body
  conn.query(
    'INSERT INTO eventdetails (std_id, name, course, sem, contact_no, email, evt_name, duration, date, conv_name, descr ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)',
    [
      std_id,
      name,
      course,
      sem,
      contact_no,
      email,
      evt_name,
      duration,
      date,
      conv_name,
      descr,
    ],
    (err, response) => {
      if (err) {
        console.log(err)
        response = 'FAILED'
      } else {
        response = 'ADDED SUCCESSFULLY'
        console.log(response)
      }
      res.send(response)
      console.log(response)
    }
  )
})

app.listen(3000, () => {
  console.log('Example app listening at port 3000')
})
