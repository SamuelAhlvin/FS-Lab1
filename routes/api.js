const express = require('express');
const mongoose = require("mongoose");
const router = express.Router();
mongoose.set('strictQuery', false);

const mongoDB = process.env.dbUrl;

main().catch(err => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}

const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log("Connected to database"));

const musicAlbumSchema = new mongoose.Schema({
  _id: Number,
  title: String,
  artist: String,
  year: Number
}, { collection: 'MusicAlbums' });

const musicAlbum = mongoose.model('MusicAlbums', musicAlbumSchema);

// Get all albums
router.get('/albums', async (req, res) => {
  const albums = await musicAlbum.find();
  res.json(albums);
})

// Get specific album by title
router.get('/albums/:title', (req, res) => {
  let album = req.params.title;
  res.send(album);
})

module.exports = router;