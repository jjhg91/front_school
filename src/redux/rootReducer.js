import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// slices
import mailReducer from './slices/mail';
import chatReducer from './slices/chat';
import productReducer from './slices/product';
import calendarReducer from './slices/calendar';
import kanbanReducer from './slices/kanban';
import userReducer from './slices/user';
import schoolReducer from './slices/school';
import becaReducer from './slices/beca';
import modalityReducer from './slices/modality';
import shiftReducer from './slices/shift';
import periodReducer from './slices/period';
import specialityReducer from './slices/speciality';
import courseReducer from './slices/course';

// ----------------------------------------------------------------------

export const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  whitelist: [],
};

export const productPersistConfig = {
  key: 'product',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['sortBy', 'checkout'],
};

export const userPersistConfig = {
  key: 'user',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['sortBy', 'checkout'],
};

export const schoolPersistConfig = {
  key: 'school',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['sortBy', 'checkout'],
};

export const becaPersistConfig = {
  key: 'beca',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['sortBy', 'checkout'],
};

export const modalityPersistConfig = {
  key: 'modality',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['sortBy', 'checkout'],
};

export const shiftPersistConfig = {
  key: 'shift',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['sortBy', 'checkout'],
};

export const periodPersistConfig = {
  key: 'period',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['sortBy', 'checkout'],
};

export const specialityPersistConfig = {
  key: 'speciality',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['sortBy', 'checkout'],
};

export const coursePersistConfig = {
  key: 'course',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['sortBy', 'checkout'],
};

const rootReducer = combineReducers({
  mail: mailReducer,
  chat: chatReducer,
  calendar: calendarReducer,
  kanban: kanbanReducer,
  product: persistReducer(productPersistConfig, productReducer),
  user: persistReducer(userPersistConfig, userReducer),
  school: persistReducer(schoolPersistConfig, schoolReducer),
  beca: persistReducer(becaPersistConfig, becaReducer),
  modality: persistReducer(modalityPersistConfig, modalityReducer),
  shift: persistReducer(shiftPersistConfig, shiftReducer),
  period: persistReducer(periodPersistConfig, periodReducer),
  speciality: persistReducer(specialityPersistConfig, specialityReducer),
  course: persistReducer(coursePersistConfig, courseReducer),
});

export default rootReducer;
