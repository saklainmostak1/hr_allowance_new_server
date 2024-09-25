const express = require('express')
const app = express()
require('dotenv').config()
const cors = require('cors')
app.use(cors())

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const crypto = require('crypto');
const sha1 = require('sha1');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const nodemailer = require('nodemailer');

const db = require('../connection/config/database');

console.log(db, 'db')




app.get('/', (req, res) => {
  res.send('Server running saklain mostak')
})


const port = process.env.PORT || 5002;
app.listen(port, () => {
  console.log(`server is running on port: ${port}`);
})



