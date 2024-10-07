import { useDispatch, useSelector } from 'react-redux';
import { addContact, selectContacts } from '/src/redux/contactsSlice.js';
import { nanoid } from 'nanoid';
import s from '/src/components/ContactForm/ContactForm.module.css';
import { useState } from 'react';

const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const [errorMessage, setErrorMessage] = useState('');
  const [numberInputClass, setNumberInputClass] = useState('');

  const handleInput = (e) => {
    const inputValue = e.target.value;

    if (/[^0-9]/.test(inputValue)) {
      setErrorMessage('Please enter a number!');
      e.target.value = inputValue.replace(/\D/g, '');
    } else {
      setErrorMessage('');
    }

    if (inputValue.length >= 7) {
      setNumberInputClass(s.valid);
    } else if (inputValue.length > 0) {
      setNumberInputClass(s.invalid);
    } else {
      setNumberInputClass('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const number = e.target.number.value;

    const isDuplicate = contacts.some(
      (contact) => contact.name === name || contact.number === number
    );

    if (isDuplicate) {
      setErrorMessage('A contact with this name or number already exists.');
      return;
    }

    if (number.length < 7) {
      alert('The number must be at least 7 digits.');
      return;
    }

    const newContact = {
      id: nanoid(),
      name,
      number,
    };

    dispatch(addContact(newContact));
    event.target.reset();
    setErrorMessage('');
    setNumberInputClass('');
  };

  return (
    <div className={s.container}>
      <form className={s.form} onSubmit={handleSubmit}>
        <label className={s.label}>Name</label>
        <input className={s.input} name='name' type='text' required />
        <label className={s.label}>Number</label>
        <input
          className={`${s.input} ${numberInputClass}`}
          name='number'
          type='tel'
          required
          minLength='7'
          onInput={handleInput}
        />
        {errorMessage && <p className={s.error}>{errorMessage}</p>}
        <button className={s.btn} type='submit'>
          Add contact
        </button>
      </form>
    </div>
  );
};

export default ContactForm;