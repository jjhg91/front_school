import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from '../../utils/axios';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: null,
  courseSpecialityRegimens: [],
  courseSpecialityRegimenOne: [],
  courseSpecialityRegimen: null,
  openModal: false,
  selectedCourseSpecialityRegimenId: null,
  selectedRange: null,
};

const slice = createSlice({
  name: 'courseSpecialityRegimen',
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
    getCourseSpecialityRegimensSuccess(state, action) {
      state.isLoading = false;
      state.courseSpecialityRegimens = action.payload;
    },

    // GET USERS
    getCourseSpecialityRegimenOneSuccess(state, action) {
      state.isLoading = false;
      state.courseSpecialityRegimenOne = action.payload;
    },

    // GET USER
    getCourseSpecialityRegimenSuccess(state, action) {
      state.isLoading = false;
      state.courseSpecialityRegimen = action.payload;
    },

    // CREATE USER
    createCourseSpecialityRegimenSuccess(state, action) {
      const newCourseSpecialityRegimen = action.payload;
      state.isLoading = false;
      state.courseSpecialityRegimens = [...state.courseSpecialityRegimens, newCourseSpecialityRegimen];
      state.courseSpecialityRegimenOne = [...state.courseSpecialityRegimenOne, newCourseSpecialityRegimen];
    },

    // UPDATE EVENT
    updateCourseSpecialityRegimenSuccess(state, action) {
      state.isLoading = false;
      state.courseSpecialityRegimens = state.courseSpecialityRegimens.map((courseSpecialityRegimen) => {
        if (courseSpecialityRegimen.id_courseSpecialityRegimen === action.payload.id_courseSpecialityRegimen) {
          return action.payload;
        }
        return courseSpecialityRegimen;
      });
      state.courseSpecialityRegimenOne = state.courseSpecialityRegimenOne.map((courseSpecialityRegimen) => {
        if (courseSpecialityRegimen.id_courseSpecialityRegimen === action.payload.id_courseSpecialityRegimen) {
          return action.payload;
        }
        return courseSpecialityRegimen;
      });
    },

    // DELETE EVENT
    deleteCourseSpecialityRegimenSuccess(state, action) {
      const courseSpecialityRegimenId = action.payload;
      state.courseSpecialityRegimens = state.courseSpecialityRegimens.filter((courseSpecialityRegimen) => courseSpecialityRegimen.id !== courseSpecialityRegimenId);
      state.courseSpecialityRegimenOne = state.courseSpecialityRegimenOne.filter((courseSpecialityRegimen) => courseSpecialityRegimen.id !== courseSpecialityRegimenId);
    },

  },
});

// Reducer
export default slice.reducer;

// Actions
export const { getCourseSpecialityRegimensSuccess, getCourseSpecialityRegimenOneSuccess, getCourseSpecialityRegimenSuccess, updateCourseSpecialityRegimenSuccess, deleteCourseSpecialityRegimenSuccess } = slice.actions;

// ----------------------------------------------------------------------

export function getCourseSpecialityRegimens() {
  const token = localStorage.getItem('accessToken');
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/courseSpecialityRegimen',{
        headers: {
          'x-auth-token': `${token}`
        }
    });
      dispatch(slice.actions.getCourseSpecialityRegimensSuccess(response.data.courseSpecialityRegimens));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getCourseSpecialityRegimenOne(specialityRegimenId) {
  const token = localStorage.getItem('accessToken');
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`/courseSpecialityRegimen/speciality/${specialityRegimenId}`,{
        headers: {
          'x-auth-token': `${token}`
        }
    });
      dispatch(slice.actions.getCourseSpecialityRegimenOneSuccess(response.data.courseSpecialityRegimenOne));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getCourseSpecialityRegimen(courseSpecialityRegimenId) {
  const token = localStorage.getItem('accessToken');
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`/courseSpecialityRegimen/${courseSpecialityRegimenId}`,{
        headers: {
          'x-auth-token': `${token}`
        }
      });
      dispatch(slice.actions.getCourseSpecialityRegimenSuccess(response.data.courseSpecialityRegimen));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}


// ----------------------------------------------------------------------

export function createCourseSpecialityRegimen(newCourseSpecialityRegimen) {
  const token = localStorage.getItem('accessToken');
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post('/courseSpecialityRegimen', newCourseSpecialityRegimen,{
        headers: {
          'x-auth-token': `${token}`
        }
        });
      dispatch(slice.actions.createCourseSpecialityRegimenSuccess(response.data.courseSpecialityRegimen));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function updateCourseSpecialityRegimen(courseSpecialityRegimenId, courseSpecialityRegimen) {
  const token = localStorage.getItem('accessToken');
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.put(`/courseSpecialityRegimen/${courseSpecialityRegimenId}`, courseSpecialityRegimen,{
        headers: {
          'x-auth-token': `${token}`
        }
      });
      dispatch(slice.actions.updateCourseSpecialityRegimenSuccess(response.data.courseSpecialityRegimen));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}


// ----------------------------------------------------------------------

export function deleteCourseSpecialityRegimen(courseSpecialityRegimenId) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      await axios.delete(`/courseSpecialityRegimen/${courseSpecialityRegimenId}`);
      dispatch(slice.actions.deleteCourseSpecialityRegimenSuccess(courseSpecialityRegimenId));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
