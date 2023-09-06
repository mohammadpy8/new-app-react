import React, { useEffect, useState } from 'react';

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

  };

  useEffect(() => {

    localStorage.setItem("contacts", JSON.stringify(contacts));

  }, [contacts]);

  useEffect(() => {

    const saveContacts = JSON.parse(localStorage.getItem("contacts"));

    if (saveContacts) setContacts(saveContacts);

  }, []);

  return (
    <main className='app'>
      <h1>Contact App</h1>
      <AddContact addContact={addContact} />
      <ContactList contactList={contacts} removeContactHandler={removeContactHandler} />
    </main>
  );
}

export default App;
