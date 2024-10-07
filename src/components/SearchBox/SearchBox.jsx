import { useDispatch, useSelector } from 'react-redux';
import { changeFilter, selectNameFilter } from '/src/redux/filtersSlice.js';
import { useState, useId } from 'react';
import s from '/src/components/SearchBox/SearchBox.module.css';

const SearchBox = () => {
  const dispatch = useDispatch();
  const filter = useSelector(selectNameFilter);
  const [isInputValid, setIsInputValid] = useState(true); 

  const handleChange = (e) => {
    const value = e.target.value;
    const isValid = /^[a-zA-Z\s]*$/.test(value); 
    setIsInputValid(isValid); 
    if (isValid) {
      dispatch(changeFilter(value));
    }
  };

  const id = useId();

  return (
    <div className={s.container}>
      <label htmlFor={id} className={s.label}>Find contacts by name</label>
        <input
          className={`${s.input} ${isInputValid ? '' : s.invalid}`} 
          type="text"
          value={filter}
          onChange={handleChange}
          id={id}
        />
      {!isInputValid && <p className={s.error}>Only alphabetic characters and spaces are permitted.</p>}
    </div>
  );
};

export default SearchBox;







// import { useDispatch, useSelector } from 'react-redux';
// import { changeFilter } from '../../redux/filtersSlice';
// import { selectNameFilter } from '../../redux/filtersSlice';
// import s from './SearchBox.module.css';

// const SearchBox = ({ onFilterChange }) => {
//   const dispatch = useDispatch();
//   const filter = useSelector(selectNameFilter);

//   const handleChange = (e) => {
//     const value = e.target.value;
//     dispatch(changeFilter(value));
//     onFilterChange(value);
//   };

//   return (
//     <div className={s.search}>
//       <label className={s.label}>
//         Find contacts by name
//         <input
//           className={s.input}
//           type='text'
//           value={filter}
//           onChange={handleChange}
//         />
//       </label>
//     </div>
//   );
// };

// export default SearchBox;
