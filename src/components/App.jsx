import { useState, useEffect } from 'react';

import Form from './Form/Form';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';

import { nanoid } from 'nanoid';
import s from './app.module.css';

const initialContacts = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
]

const App = () => {
  const [contacts, setContacts] = useState(() => {
    const value = JSON.parse(localStorage.getItem('contacts'));
    return (
      value || initialContacts
    );
  });

  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const formSubmitHandler = data => {
    if (contacts.find(contact => data.name === contact.name)) {
      return alert(`${data.name} is already in contacts.`);
    }

    setContacts(prevState => {
      const newContact = {
        ...data,
        id: nanoid(),
      };

      return [newContact, ...prevState];
    });
  };

  const removeContact = id => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== id)
    );
  };

  const filterChange = ({ target }) => {
    setFilter(target.value);
  };

  const getFilteredContacts = () => {
    if (!contacts) {
      return contacts;
    }
    const filteredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );

    return filteredContacts;
  };

  const contactsFiltered = getFilteredContacts();

  return (
    <div className={s.section}>
      <h1 className={s.title}>Phonebook</h1>
      <Form onSubmit={formSubmitHandler} />
      <h2 className={s.title}>Contacts</h2>
      <Filter onChange={filterChange} />
      <ContactList items={contactsFiltered} removeContact={removeContact} />
    </div>
  );
};

export default App;
