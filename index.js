const express = require('express');
const app = express();
require("dotenv").config();

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const apiRouter = require('./routes/api');
app.use('/api', apiRouter);

app.listen(process.env.port, () => {
  console.log("Server listening on port: " + process.env.port);
})

app.get('/', (req, res) => {
  res.sendFile('/index.html', { root: __dirname });
})