import React from 'react';

import Navbar from './components/NavBar';

import './App.scss';

function App() {
  return (
    <main>
      {/* Sidebar component goes here */}
      <Navbar />
      <div className='movie-directory'>
        <h1>Overall Top Rated</h1>
      </div>
      {/* Movie Directory component goes here */}
    </main>
  );
}

export default App;
