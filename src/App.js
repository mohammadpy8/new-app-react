import React, { useState } from 'react';

import AddContact from './components/AddContact';
import ContactList from './components/ContactList';

import './App.css';

function App() {

  const [contacts, setContacts] = useState([]);

  const addContact = contact => {
    
    setContacts([...contacts, { id: crypto.randomUUID(), ...contact }]);
  }; 

  const removeContactHandler = (id) => {

    const filteredContact = contacts.filter(contact => contact.id !== id);
    setContacts(filteredContact)

  }

  return (
    <main className='app'>
      <h1>Contact App</h1>
      <AddContact addContact={addContact} />
      <ContactList contactList={contacts} removeContactHandler={removeContactHandler} />
    </main>
  );
}

export default App;
