import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from '../../utils/axios';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: null,
  specialitys: [],
  speciality: null,
  openModal: false,
  selectedSpecialityId: null,
  selectedRange: null,
};

const slice = createSlice({
  name: 'speciality',
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
    getSpecialitysSuccess(state, action) {
      state.isLoading = false;
      state.specialitys = action.payload;
    },

    // GET USER
    getSpecialitySuccess(state, action) {
      state.isLoading = false;
      state.speciality = action.payload;
    },

    // CREATE USER
    createSpecialitySuccess(state, action) {
      const newSpeciality = action.payload;
      state.isLoading = false;
      state.specialitys = [...state.specialitys, newSpeciality];
    },

    // UPDATE EVENT
    updateSpecialitySuccess(state, action) {
      state.isLoading = false;
      state.specialitys = state.specialitys.map((speciality) => {
        if (speciality.id_speciality === action.payload.id_speciality) {
          return action.payload;
        }
        return speciality;
      });
    },

    // DELETE EVENT
    deleteSpecialitySuccess(state, action) {
      const specialityId = action.payload;
      state.specialitys = state.specialitys.filter((speciality) => speciality.id !== specialityId);
    },

  },
});

// Reducer
export default slice.reducer;

// Actions
export const { getSpecialitysSuccess, getSpecialitySuccess, updateSpecialitySuccess, deleteSpecialitySuccess } = slice.actions;

// ----------------------------------------------------------------------

export function getSpecialitys() {
  const token = localStorage.getItem('accessToken');
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/speciality',{
        headers: {
          'x-auth-token': `${token}`
        }
    });
      dispatch(slice.actions.getSpecialitysSuccess(response.data.specialitys));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getSpeciality(specialityId) {
  const token = localStorage.getItem('accessToken');
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`/speciality/${specialityId}`,{
        headers: {
          'x-auth-token': `${token}`
        }
      });
      dispatch(slice.actions.getSpecialitySuccess(response.data.speciality));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}


// ----------------------------------------------------------------------

export function createSpeciality(newSpeciality) {
  const token = localStorage.getItem('accessToken');
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post('/speciality', newSpeciality,{
        headers: {
          'x-auth-token': `${token}`
        }
        });
      dispatch(slice.actions.createSpecialitySuccess(response.data.speciality));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function updateSpeciality(specialityId, speciality) {
  const token = localStorage.getItem('accessToken');
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.put(`/speciality/${specialityId}`, speciality,{
        headers: {
          'x-auth-token': `${token}`
        }
      });
      dispatch(slice.actions.updateSpecialitySuccess(response.data.speciality));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}


// ----------------------------------------------------------------------

export function deleteSpeciality(specialityId) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      await axios.delete(`/speciality/${specialityId}`);
      dispatch(slice.actions.deleteSpecialitySuccess(specialityId));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
