import { useDispatch, useSelector } from 'react-redux';
import { deleteContact, selectContacts } from '/src/redux/contactsSlice.js';
import { selectNameFilter } from '/src/redux/filtersSlice.js';
import Contact from '/src/components/Contact/Contact.jsx';
import s from '/src/components/ContactList/ContactList.module.css';

const ContactList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const filter = useSelector(selectNameFilter);

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <ul className={s.list}>
      {filteredContacts.length === 0 && filter && <li>No results found!</li>}
      {filteredContacts.map((contact) => (
        <Contact
          className={s.item}
          key={contact.id}
          name={contact.name}
          number={contact.number}
          onDelete={() => dispatch(deleteContact(contact.id))}
        />
      ))}
    </ul>
  );
};

export default ContactList;

