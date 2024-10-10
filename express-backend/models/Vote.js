const mongoose = require('mongoose');

const voteSchema = new mongoose.Schema({
  webtoonId: { type: mongoose.Schema.Types.ObjectId, ref: 'Webtoon', required: true },
  manhwaVotes: { type: Number, default: 0 },
  animeVotes: { type: Number, default: 0 }
});

const Vote = mongoose.model('Vote', voteSchema);

module.exports = Vote;
