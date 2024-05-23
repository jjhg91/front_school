import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from '../../utils/axios';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: null,
  schools: [],
  school: null,
  openModal: false,
  selectedSchoolId: null,
  selectedRange: null,
};

const slice = createSlice({
  name: 'school',
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
    getSchoolsSuccess(state, action) {
      state.isLoading = false;
      state.schools = action.payload;
    },

    // GET USER
    getSchoolSuccess(state, action) {
      state.isLoading = false;
      state.school = action.payload;
    },

    // CREATE USER
    createSchoolSuccess(state, action) {
      const newSchool = action.payload;
      state.isLoading = false;
      state.schools = [...state.schools, newSchool];
    },

    // UPDATE EVENT
    updateSchoolSuccess(state, action) {
      state.isLoading = false;
      state.schools = state.schools.map((school) => {
        if (school.id_school === action.payload.id_school) {
          return action.payload;
        }
        return school;
      });
    },

    // DELETE EVENT
    deleteSchoolSuccess(state, action) {
      const schoolId = action.payload;
      state.schools = state.schools.filter((school) => school.id !== schoolId);
    },

  },
});

// Reducer
export default slice.reducer;

// Actions
export const { getSchoolsSuccess, getSchoolSuccess, updateSchoolSuccess, deleteSchoolSuccess } = slice.actions;

// ----------------------------------------------------------------------

export function getSchools() {
  const token = localStorage.getItem('accessToken');
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/school',{
        headers: {
          'x-auth-token': `${token}`
        }
    });
      dispatch(slice.actions.getSchoolsSuccess(response.data.schools));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getSchool(schoolId) {
  const token = localStorage.getItem('accessToken');
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`/school/${schoolId}`,{
        headers: {
          'x-auth-token': `${token}`
        }
      });
      dispatch(slice.actions.getSchoolSuccess(response.data.school));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}


// ----------------------------------------------------------------------

export function createSchool(newSchool) {
  const token = localStorage.getItem('accessToken');
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post('/school', newSchool,{
        headers: {
          'x-auth-token': `${token}`
        }
        });
      dispatch(slice.actions.createSchoolSuccess(response.data.school));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function updateSchool(schoolId, school) {
  const token = localStorage.getItem('accessToken');
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.put(`/school/${schoolId}`, school,{
        headers: {
          'x-auth-token': `${token}`
        }
      });
      dispatch(slice.actions.updateSchoolSuccess(response.data.school));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}


// ----------------------------------------------------------------------

export function deleteSchool(schoolId) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      await axios.delete(`/school/${schoolId}`);
      dispatch(slice.actions.deleteSchoolSuccess(schoolId));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
