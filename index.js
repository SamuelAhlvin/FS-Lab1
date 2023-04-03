const express = require('express');
const app = express();
const mongoose = require("mongoose");
require("dotenv").config()

app.use(express.urlencoded({ extended: false }))
app.use(express.json());
mongoose.set('strictQuery', false);

const mongoDB = process.env.dbUrl;

main().catch(err => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}

app.listen(process.env.port, () => {
  console.log("Server listening on port: " + process.env.port);
})

app.get('/', (req, res) => {
  res.sendFile('/index.html', { root: __dirname })
})