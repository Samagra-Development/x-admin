import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

import { authReducer } from './authReducer';

const rootPersistConfig = {
  key: 'root',
  storage,
  blacklist: ['navigation'],
};

const authPersistConfig = {
  key: 'auth',
  storage,
  blacklist: ['isLoggingIn'],
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  // navigation: navReducer,
  // notes: notesReducer
});

export default persistReducer(rootPersistConfig, rootReducer);
