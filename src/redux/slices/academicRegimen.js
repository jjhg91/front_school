import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from '../../utils/axios';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: null,
  academicRegimens: [],
  academicRegimen: null,
  openModal: false,
  selectedAcademicRegimenId: null,
  selectedRange: null,
};

const slice = createSlice({
  name: 'academicRegimen',
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
    getAcademicRegimensSuccess(state, action) {
      state.isLoading = false;
      state.academicRegimens = action.payload;
    },

    // GET USER
    getAcademicRegimenSuccess(state, action) {
      state.isLoading = false;
      state.academicRegimen = action.payload;
    },

    // CREATE USER
    createAcademicRegimenSuccess(state, action) {
      const newAcademicRegimen = action.payload;
      state.isLoading = false;
      state.academicRegimens = [...state.academicRegimens, newAcademicRegimen];
    },

    // UPDATE EVENT
    updateAcademicRegimenSuccess(state, action) {
      state.isLoading = false;
      state.academicRegimens = state.academicRegimens.map((academicRegimen) => {
        if (academicRegimen.id_academicRegimen === action.payload.id_academicRegimen) {
          return action.payload;
        }
        return academicRegimen;
      });
    },

    // DELETE EVENT
    deleteAcademicRegimenSuccess(state, action) {
      const academicRegimenId = action.payload;
      state.academicRegimens = state.academicRegimens.filter((academicRegimen) => academicRegimen.id !== academicRegimenId);
    },

  },
});

// Reducer
export default slice.reducer;

// Actions
export const { getAcademicRegimensSuccess, getAcademicRegimenSuccess, updateAcademicRegimenSuccess, deleteAcademicRegimenSuccess } = slice.actions;

// ----------------------------------------------------------------------

export function getAcademicRegimens() {
  const token = localStorage.getItem('accessToken');
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/academicRegimen',{
        headers: {
          'x-auth-token': `${token}`
        }
    });
      dispatch(slice.actions.getAcademicRegimensSuccess(response.data.academicRegimens));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getAcademicRegimen(academicRegimenId) {
  const token = localStorage.getItem('accessToken');
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`/academicRegimen/${academicRegimenId}`,{
        headers: {
          'x-auth-token': `${token}`
        }
      });
      dispatch(slice.actions.getAcademicRegimenSuccess(response.data.academicRegimen));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}


// ----------------------------------------------------------------------

export function createAcademicRegimen(newAcademicRegimen) {
  const token = localStorage.getItem('accessToken');
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post('/academicRegimen', newAcademicRegimen,{
        headers: {
          'x-auth-token': `${token}`
        }
        });
      dispatch(slice.actions.createAcademicRegimenSuccess(response.data.academicRegimen));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function updateAcademicRegimen(academicRegimenId, academicRegimen) {
  const token = localStorage.getItem('accessToken');
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.put(`/academicRegimen/${academicRegimenId}`, academicRegimen,{
        headers: {
          'x-auth-token': `${token}`
        }
      });
      dispatch(slice.actions.updateAcademicRegimenSuccess(response.data.academicRegimen));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}


// ----------------------------------------------------------------------

export function deleteAcademicRegimen(academicRegimenId) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      await axios.delete(`/academicRegimen/${academicRegimenId}`);
      dispatch(slice.actions.deleteAcademicRegimenSuccess(academicRegimenId));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
