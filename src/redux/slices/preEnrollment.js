import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from '../../utils/axios';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: null,
  preEnrollments: [],
  preEnrollment: null,
  preEnrollmentStudent: [],
  openModal: false,
  selectedPreEnrollmentId: null,
  selectedRange: null,
};

const slice = createSlice({
  name: 'preEnrollment',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    // GET USERS
    getPreEnrollmentsSuccess(state, action) {
      state.isLoading = false;
      state.preEnrollments = action.payload;
    },

    // GET USER
    getPreEnrollmentSuccess(state, action) {
      state.isLoading = false;
      state.preEnrollment = action.payload;
    },

    // GET USER STUDENT
    getPreEnrollmentStudentSuccess(state, action) {
      state.isLoading = false;
      state.preEnrollmentStudent = action.payload;
    },

    // CREATE USER
    createPreEnrollmentSuccess(state, action) {
      const newPreEnrollment = action.payload;
      state.isLoading = false;
      state.preEnrollments = [...state.preEnrollments, newPreEnrollment];
    },

    // UPDATE EVENT
    updatePreEnrollmentSuccess(state, action) {
      state.isLoading = false;
      state.preEnrollments = state.preEnrollments.map((preEnrollment) => {
        if (preEnrollment.id_preEnrollment === action.payload.id_preEnrollment) {
          return action.payload;
        }
        return preEnrollment;
      });
    },

    // DELETE EVENT
    deletePreEnrollmentSuccess(state, action) {
      const preEnrollmentId = action.payload;
      state.preEnrollments = state.preEnrollments.filter((preEnrollment) => preEnrollment.id !== preEnrollmentId);
    },

  },
});

// Reducer
export default slice.reducer;

// Actions
export const { getPreEnrollmentsSuccess, getPreEnrollmentSuccess, getPreEnrollmentStudentSuccess, updatePreEnrollmentSuccess, deletePreEnrollmentSuccess } = slice.actions;

// ----------------------------------------------------------------------

export function getPreEnrollments() {
  const token = localStorage.getItem('accessToken');
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/preEnrollment',{
        headers: {
          'x-auth-token': `${token}`
        }
    });
      dispatch(slice.actions.getPreEnrollmentsSuccess(response.data.preEnrollments));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getPreEnrollment(preEnrollmentId) {
  const token = localStorage.getItem('accessToken');
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`/preEnrollment/${preEnrollmentId}`,{
        headers: {
          'x-auth-token': `${token}`
        }
      });
      dispatch(slice.actions.getPreEnrollmentSuccess(response.data.preEnrollment));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getPreEnrollmentStudent(preEnrollmentId) {
  const token = localStorage.getItem('accessToken');
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`/preEnrollment/student/${preEnrollmentId}`,{
        headers: {
          'x-auth-token': `${token}`
        }
      });
      dispatch(slice.actions.getPreEnrollmentStudentSuccess(response.data.preEnrollmentStudent));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}


// ----------------------------------------------------------------------

export function createPreEnrollment(newPreEnrollment) {
  const token = localStorage.getItem('accessToken');
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post('/preEnrollment', newPreEnrollment,{
        headers: {
          'x-auth-token': `${token}`
        }
        });
      dispatch(slice.actions.createPreEnrollmentSuccess(response.data.preEnrollment));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function updatePreEnrollment(preEnrollmentId, preEnrollment) {
  const token = localStorage.getItem('accessToken');
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.put(`/preEnrollment/${preEnrollmentId}`, preEnrollment,{
        headers: {
          'x-auth-token': `${token}`
        }
      });
      dispatch(slice.actions.updatePreEnrollmentSuccess(response.data.preEnrollment));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}


// ----------------------------------------------------------------------

export function deletePreEnrollment(preEnrollmentId) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      await axios.delete(`/preEnrollment/${preEnrollmentId}`);
      dispatch(slice.actions.deletePreEnrollmentSuccess(preEnrollmentId));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
