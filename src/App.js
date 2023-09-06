import React, { useState } from 'react';

import AddContact from './components/AddContact';
import ContactList from './components/ContactList';

import './App.css';

function App() {

  const [contacts, setContacts] = useState([]);

  const addContact = contact => {
    
    setContacts([...contacts, { id: crypto.randomUUID(), ...contact }]);
  };

  return (
    <main className='app'>
      <h1>Contact App</h1>
      <AddContact addContact={addContact} />
      <ContactList contactList={contacts} />
    </main>
  );
}

export default App;
