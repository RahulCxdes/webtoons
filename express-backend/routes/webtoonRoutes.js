const express = require('express');
const router = express.Router();
const Webtoon = require('../models/Webtoon');

// POST request to add new webtoons
router.post('/add', async (req, res) => {
  const { title, description, image } = req.body;

  try {
    const newWebtoon = new Webtoon({ title, description, image });
    await newWebtoon.save();
    res.status(201).json({ message: "Webtoon added successfully!" });
  } catch (error) {
    res.status(400).json({ error: "Failed to add webtoon" });
  }
});

// GET request to fetch top 5 webtoons
router.get('/', async (req, res) => {
  try {
    const webtoons = await Webtoon.find().limit(5);
    res.json(webtoons);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch webtoons" });
  }
});

module.exports = router;
