import React from 'react';
import AddContact from './components/AddContact';

import './App.css';

function App() {
  return (
    <main className='app'>
      <h1>Contact App</h1>
      <AddContact />
      <section>Contact List</section>
    </main>
  );
}

export default App;
