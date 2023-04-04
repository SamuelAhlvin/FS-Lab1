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
router.get('/albums/:title', async (req, res) => {
  const album = await musicAlbum.find({ title: req.params.title });
  if (album.length > 0) {
    res.json(album);
  } else {
    res.status(404).json('Album not found');
  }
})

// Add a new album
router.post('/albums/', async (req, res) => {

  const exists = await musicAlbum.find({ title: req.body.title, artist: req.body.artist });

  if (exists.length > 0) {
    res.status(409).json('Conflict, album already exists');
  } else {
    const album = new musicAlbum({
      title: req.body.title,
      artist: req.body.artist,
      year: req.body.year,
      _id: req.body._id
    });

    try {
      const newAlbum = await album.save()
      res.status(201).json(newAlbum);
    } catch (err) {
      console.log(err);
    }
  }

})

// Updating an album
router.put('/albums/:id', async (req, res) => {

  const album = await musicAlbum.findById(parseInt(req.params.id));

  if (album != null) {
    if (req.body.title != null) {
      album.title = req.body.title;
    }
    if (req.body.artist != null) {
      album.artist = req.body.artist;
    }
    if (req.body.year != null) {
      album.year = req.body.year;
    }

    try {
      const updateAlbum = await album.save()
      res.status(200).json(updateAlbum);
    } catch (err) {
      console.log(err);
    }

  } else {
    res.status(404).json('Album not found');
  }

})

module.exports = router;