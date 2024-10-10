import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import './WebtoonList.css';

const WebtoonList = React.memo(() => {
  const [webtoons, setWebtoons] = useState([]);
  const [votes, setVotes] = useState({}); 

  const fetchWebtoons = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/webtoons');
      setWebtoons(response.data);
    } catch (error) {
      console.error("Failed to fetch webtoons:", error);
    }
  }, []);

  const fetchVotes = useCallback(async (webtoonId) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/votes/results/${webtoonId}`);
      setVotes(prevVotes => ({ ...prevVotes, [webtoonId]: response.data }));
    } catch (error) {
      console.error("Failed to fetch votes:", error);
    }
  }, []);

  const handleVote = async (webtoonId, version) => {
    try {
      await axios.post('http://localhost:5000/api/votes/vote', { webtoonId, version });
      fetchVotes(webtoonId); 
    } catch (error) {
      console.error("Failed to submit vote:", error);
    }
  };

  useEffect(() => {
    fetchWebtoons();
  }, [fetchWebtoons]);

  return (
    <div className="webtoon-list">
      <h2>Top 5 Webtoons</h2>
      <div className="webtoon-grid">
        {webtoons.map((webtoon) => (
          <div key={webtoon._id} className="webtoon-card">
            <h3>{webtoon.title}</h3>
            <img 
              src={webtoon.image} 
              alt={webtoon.title} 
              loading="lazy" 
              className="webtoon-image"
            />
            <p>{webtoon.description}</p>
            
         
            <div className="vote-section">
              <button onClick={() => handleVote(webtoon._id, 'manhwa')}>Vote Manhwa</button>
              <button onClick={() => handleVote(webtoon._id, 'anime')}>Vote Anime</button>
            </div>
            
        \
            {votes[webtoon._id] && (
            <div className="vote-results">
                <p>Manhwa Votes: {votes[webtoon._id].manhwaVotes}</p>
                <p>Anime Votes: {votes[webtoon._id].animeVotes}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
});

export default WebtoonList;
