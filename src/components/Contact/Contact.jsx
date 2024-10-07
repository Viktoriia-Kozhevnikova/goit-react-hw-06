import s from '/src/components/Contact/Contact.module.css';
import { HiUser, HiPhone } from "react-icons/hi";

const Contact = ({ name, number, onDelete }) => {
  return (
    <div className={s.container}>
      <div className={s.contact}>
        <p className={s.text}> 
          <HiUser className={s.icon} />
          {name}
        </p>
        <p className={s.text}>
          <HiPhone className={s.icon} />
          {number}
        </p>
      </div>
      <button className={s.btn} onClick={onDelete}>
        Delete
      </button>
    </div>
  );
};

export default Contact;