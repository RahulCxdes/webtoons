const express = require('express');
const router = express.Router();
const Vote = require('../models/Vote');


router.post('/vote', async (req, res) => {
  const { webtoonId, version } = req.body; 

  try {
    let vote = await Vote.findOne({ webtoonId });

    if (!vote) {
      vote = new Vote({ webtoonId });
    }

    if (version === 'manhwa') {
      vote.manhwaVotes += 1;
    } else if (version === 'anime') {
      vote.animeVotes += 1;
    }

    await vote.save();
    res.status(200).json({ message: 'Vote submitted successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to submit vote' });
  }
});


router.get('/results/:webtoonId', async (req, res) => {
  const { webtoonId } = req.params;

  try {
    const vote = await Vote.findOne({ webtoonId });

    if (vote) {
      res.json({
        manhwaVotes: vote.manhwaVotes,
        animeVotes: vote.animeVotes
      });
    } else {
      res.json({ manhwaVotes: 0, animeVotes: 0 });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch results' });
  }
});

module.exports = router;
