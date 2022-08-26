import { Component } from 'react';
import Form from './Form/Form';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';

import { nanoid } from 'nanoid';
import s from './app.module.css';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    const contacts = JSON.parse(localStorage.getItem('contacts'));

    if (contacts?.length) {
      this.setState({
        contacts: contacts,
      });
    }
  }
  componentDidUpdate(prevProps, prevState) {
    const { contacts } = this.state;

    if (prevState.contacts !== contacts) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  }

  formSubmitHandler = data => {
    const { contacts } = this.state;

    if (contacts.find(contact => data.name === contact.name)) {
      return alert(`${data.name} is already in contacts.`);
    }

    this.setState(prevState => {
      const newContact = {
        id: nanoid(),
        ...data,
      };
      return {
        contacts: [newContact, ...prevState.contacts],
      };
    });
  };

  removeContact = id => {
    this.setState(({ contacts }) => {
      const newContacts = contacts.filter(contact => contact.id !== id);
      return {
        contacts: newContacts,
      };
    });
  };

  filterChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  getFilteredContacts = () => {
    const { contacts, filter } = this.state;

    if (!contacts) {
      return contacts;
    }
    const filteredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );

    return filteredContacts;
  };

  render() {
    const contacts = this.getFilteredContacts();
    const { formSubmitHandler, filterChange, removeContact } = this;
    return (
      <div className={s.section}>
        <h1 className={s.title}>Phonebook</h1>
        <Form onSubmit={formSubmitHandler} />
        <h2 className={s.title}>Contacts</h2>
        <Filter onChange={filterChange} />
        <ContactList items={contacts} removeContact={removeContact} />
      </div>
    );
  }
}
