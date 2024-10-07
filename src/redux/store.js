import { configureStore } from '@reduxjs/toolkit';
import contactsReducer from '/src/redux/contactsSlice.js';
import filtersReducer from '/src/redux/filtersSlice.js';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';

const persistedContactsConfig = {
  key: 'contacts',
  storage,
};

const rootReducer = combineReducers({
  contacts: persistReducer(persistedContactsConfig, contactsReducer),
  filters: filtersReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
export default store;
