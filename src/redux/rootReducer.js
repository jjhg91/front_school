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
import studentReducer from './slices/student';
import representativeReducer from './slices/representative';
import teacherReducer from './slices/teacher';
import staffReducer from './slices/staff';
import schoolReducer from './slices/school';
import becaReducer from './slices/beca';
import modalityReducer from './slices/modality';
import shiftReducer from './slices/shift';
import periodReducer from './slices/period';
import specialityReducer from './slices/speciality';
import courseReducer from './slices/course';
import courseSpecialityRegimenReducer from './slices/courseSpecialityRegimen';
import academicRegimenReducer from './slices/academicRegimen';
import specialityRegimenReducer from './slices/specialityRegimen';
import productServiceReducer from './slices/productService';
import specialityRegimenOfferingReducer from './slices/specialityRegimenOffering';
import preEnrollmentReducer from './slices/preEnrollment';
import invoiceReducer from './slices/invoice';

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

export const studentPersistConfig = {
  key: 'student',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['sortBy', 'checkout'],
};

export const representativePersistConfig = {
  key: 'representative',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['sortBy', 'checkout'],
};

export const teacherPersistConfig = {
  key: 'teacher',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['sortBy', 'checkout'],
};

export const staffPersistConfig = {
  key: 'staff',
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

export const courseSpecialityRegimenPersistConfig = {
  key: 'courseSpecialityRegimen',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['sortBy', 'checkout'],
};

export const academicRegimenPersistConfig = {
  key: 'academicRegimen',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['sortBy', 'checkout'],
};

export const specialityRegimenPersistConfig = {
  key: 'specialityRegimen',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['sortBy', 'checkout'],
};

export const productServicePersistConfig = {
  key: 'productService',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['sortBy', 'checkout'],
};

export const specialityRegimenOfferingPersistConfig = {
  key: 'specialityRegimenOffering',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['sortBy', 'checkout'],
};

export const preEnrollmentPersistConfig = {
  key: 'preEnrollment',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['sortBy', 'checkout'],
};

export const invoicePersistConfig = {
  key: 'invoice',
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
  student: persistReducer(studentPersistConfig, studentReducer),
  representative: persistReducer(representativePersistConfig, representativeReducer),
  teacher: persistReducer(teacherPersistConfig, teacherReducer),
  staff: persistReducer(staffPersistConfig, staffReducer),
  school: persistReducer(schoolPersistConfig, schoolReducer),
  beca: persistReducer(becaPersistConfig, becaReducer),
  modality: persistReducer(modalityPersistConfig, modalityReducer),
  shift: persistReducer(shiftPersistConfig, shiftReducer),
  period: persistReducer(periodPersistConfig, periodReducer),
  speciality: persistReducer(specialityPersistConfig, specialityReducer),
  course: persistReducer(coursePersistConfig, courseReducer),
  courseSpecialityRegimen: persistReducer(courseSpecialityRegimenPersistConfig, courseSpecialityRegimenReducer),
  academicRegimen: persistReducer(academicRegimenPersistConfig, academicRegimenReducer),
  specialityRegimen: persistReducer(specialityRegimenPersistConfig, specialityRegimenReducer),
  productService: persistReducer(productServicePersistConfig, productServiceReducer),
  specialityRegimenOffering: persistReducer(specialityRegimenOfferingPersistConfig, specialityRegimenOfferingReducer),
  preEnrollment: persistReducer(preEnrollmentPersistConfig, preEnrollmentReducer),
  invoice: persistReducer(invoicePersistConfig, invoiceReducer),
});

export default rootReducer;
