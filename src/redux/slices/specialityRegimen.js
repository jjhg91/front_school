import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from '../../utils/axios';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: null,
  specialityRegimens: [],
  specialityRegimen: null,
  openModal: false,
  selectedSpecialityRegimenId: null,
  selectedRange: null,
};

const slice = createSlice({
  name: 'specialityRegimen',
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
    getSpecialityRegimensSuccess(state, action) {
      state.isLoading = false;
      state.specialityRegimens = action.payload;
    },

    // GET USER
    getSpecialityRegimenSuccess(state, action) {
      state.isLoading = false;
      state.specialityRegimen = action.payload;
    },

    // CREATE USER
    createSpecialityRegimenSuccess(state, action) {
      const newSpecialityRegimen = action.payload;
      state.isLoading = false;
      state.specialityRegimens = [...state.specialityRegimens, newSpecialityRegimen];
    },

    // UPDATE EVENT
    updateSpecialityRegimenSuccess(state, action) {
      state.isLoading = false;
      state.specialityRegimens = state.specialityRegimens.map((specialityRegimen) => {
        if (specialityRegimen.id_specialityRegimen === action.payload.id_specialityRegimen) {
          return action.payload;
        }
        return specialityRegimen;
      });
    },

    // DELETE EVENT
    deleteSpecialityRegimenSuccess(state, action) {
      const specialityRegimenId = action.payload;
      state.specialityRegimens = state.specialityRegimens.filter((specialityRegimen) => specialityRegimen.id !== specialityRegimenId);
    },

  },
});

// Reducer
export default slice.reducer;

// Actions
export const { getSpecialityRegimensSuccess, getSpecialityRegimenSuccess, updateSpecialityRegimenSuccess, deleteSpecialityRegimenSuccess } = slice.actions;

// ----------------------------------------------------------------------

export function getSpecialityRegimens() {
  const token = localStorage.getItem('accessToken');
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/specialityRegimen',{
        headers: {
          'x-auth-token': `${token}`
        }
    });
      dispatch(slice.actions.getSpecialityRegimensSuccess(response.data.specialityRegimens));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getSpecialityRegimen(specialityRegimenId) {
  const token = localStorage.getItem('accessToken');
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`/specialityRegimen/${specialityRegimenId}`,{
        headers: {
          'x-auth-token': `${token}`
        }
      });
      dispatch(slice.actions.getSpecialityRegimenSuccess(response.data.specialityRegimen));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}


// ----------------------------------------------------------------------

export function createSpecialityRegimen(newSpecialityRegimen) {
  const token = localStorage.getItem('accessToken');
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post('/specialityRegimen', newSpecialityRegimen,{
        headers: {
          'x-auth-token': `${token}`
        }
        });
      dispatch(slice.actions.createSpecialityRegimenSuccess(response.data.specialityRegimen));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function updateSpecialityRegimen(specialityRegimenId, specialityRegimen) {
  const token = localStorage.getItem('accessToken');
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.put(`/specialityRegimen/${specialityRegimenId}`, specialityRegimen,{
        headers: {
          'x-auth-token': `${token}`
        }
      });
      dispatch(slice.actions.updateSpecialityRegimenSuccess(response.data.specialityRegimen));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}


// ----------------------------------------------------------------------

export function deleteSpecialityRegimen(specialityRegimenId) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      await axios.delete(`/specialityRegimen/${specialityRegimenId}`);
      dispatch(slice.actions.deleteSpecialityRegimenSuccess(specialityRegimenId));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
