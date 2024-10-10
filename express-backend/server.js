const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const webtoonRoutes = require('./routes/webtoonRoutes');
const voteRoutes = require('./routes/voteRoutes');

dotenv.config();


const app = express();


connectDB();

app.use(cors());
app.use(express.json());


app.use('/api/webtoons', webtoonRoutes);
app.use('/api/votes', voteRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
