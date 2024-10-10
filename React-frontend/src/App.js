import React from 'react';
import WebtoonList from './components/WebtoonList';
// import VoteComponent from './components/VoteComponent';
// import './App.css'; // Optional for styling

function App() {
  return (
    <div className="App">
      <header>
        <h1>Fantasy Webtoons & Manhwa vs Anime Voting</h1>
      </header>
      <main>
        <WebtoonList />
        {/* <VoteComponent /> */}
      </main>
    </div>
  );
}

export default App;
