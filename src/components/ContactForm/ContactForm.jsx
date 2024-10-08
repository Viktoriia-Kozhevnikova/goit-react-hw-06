import { useDispatch, useSelector } from 'react-redux'; 
import { addContact, selectContacts } from '/src/redux/contactsSlice.js';
import { nanoid } from 'nanoid';
import s from '/src/components/ContactForm/ContactForm.module.css';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';

const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const [errorMessage, setErrorMessage] = useState('');

  const contactSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    number: Yup.string()
      .matches(/^\d+$/, 'Number must contain only digits.')
      .min(7, 'The number must be at least 7 digits.')
      .required('Required'),
  });

  const handleSubmit = (values, { resetForm }) => {
    const { name, number } = values;

    const isDuplicate = contacts.some(
      (contact) => contact.name === name || contact.number === number
    );

    if (isDuplicate) {
      setErrorMessage('A contact with this name or number already exists.');
      return;
    }

    const newContact = {
      id: nanoid(),
      name,
      number,
    };

    dispatch(addContact(newContact));
    resetForm();
    setErrorMessage('');
  };

  return (
    <Formik
      initialValues={{ name: '', number: '' }}
      validationSchema={contactSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched }) => (
        <Form className={s.form}>
          <label className={s.label}>Name</label>
          <Field
            name="name"
            type="text"
            className={`${s.input} ${errors.name && touched.name ? s.invalid : ''}`}
          />
          <ErrorMessage name="name" component="span" className={s.error} />

          <label className={s.label}>Number</label>
          <Field
            name="number"
            type="tel"
            className={`${s.input} ${errors.number && touched.number ? s.invalid : ''}`}
          />
          <ErrorMessage name="number" component="span" className={s.error} />

          {errorMessage && <p className={s.error}>{errorMessage}</p>}

          <button type="submit" className={s.btn}>Add contact</button>
        </Form>
      )}
    </Formik>
  );
};

export default ContactForm;

