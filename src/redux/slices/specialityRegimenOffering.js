import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from '../../utils/axios';

//----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: null,
  specialityRegimenOfferings: [],
  specialityRegimenOffering: null,
  openModal: false,
  selectedSpecialityRegimenOfferingId: null,
  selectedRange: null,
};

const slice = createSlice({
  name: 'specialityRegimenOffering',
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
    getSpecialityRegimenOfferingsSuccess(state, action) {
      state.isLoading = false;
      state.specialityRegimenOfferings = action.payload;
    },

    // GET USER
    getSpecialityRegimenOfferingSuccess(state, action) {
      state.isLoading = false;
      state.specialityRegimenOffering = action.payload;
    },

    // CREATE USER
    createSpecialityRegimenOfferingSuccess(state, action) {
      const newSpecialityRegimenOffering = action.payload;
      state.isLoading = false;
      state.specialityRegimenOfferings = [...state.specialityRegimenOfferings, newSpecialityRegimenOffering];
    },

    // UPDATE EVENT
    updateSpecialityRegimenOfferingSuccess(state, action) {
      state.isLoading = false;
      state.specialityRegimenOfferings = state.specialityRegimenOfferings.map((specialityRegimenOffering) => {
        if (specialityRegimenOffering.id_specialityRegimenOffering === action.payload.id_specialityRegimenOffering) {
          return action.payload;
        }
        return specialityRegimenOffering;
      });
    },

    // DELETE EVENT
    deleteSpecialityRegimenOfferingSuccess(state, action) {
      const specialityRegimenOfferingId = action.payload;
      state.specialityRegimenOfferings = state.specialityRegimenOfferings.filter((specialityRegimenOffering) => specialityRegimenOffering.id !== specialityRegimenOfferingId);
    },

  },
});

// Reducer
export default slice.reducer;

// Actions
export const { getSpecialityRegimenOfferingsSuccess, getSpecialityRegimenOfferingSuccess, updateSpecialityRegimenOfferingSuccess, deleteSpecialityRegimenOfferingSuccess } = slice.actions;

// ----------------------------------------------------------------------

export function getSpecialityRegimenOfferings() {
  const token = localStorage.getItem('accessToken');
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/specialityRegimenOffering',{
        headers: {
          'x-auth-token': `${token}`
        }
    });
      dispatch(slice.actions.getSpecialityRegimenOfferingsSuccess(response.data.specialityRegimenOfferings));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getSpecialityRegimenOffering(specialityRegimenOfferingId) {
  const token = localStorage.getItem('accessToken');
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`/specialityRegimenOffering/${specialityRegimenOfferingId}`,{
        headers: {
          'x-auth-token': `${token}`
        }
      });
      dispatch(slice.actions.getSpecialityRegimenOfferingSuccess(response.data.specialityRegimenOffering));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}


// ----------------------------------------------------------------------

export function createSpecialityRegimenOffering(newSpecialityRegimenOffering) {
  const token = localStorage.getItem('accessToken');
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post('/specialityRegimenOffering', newSpecialityRegimenOffering,{
        headers: {
          'x-auth-token': `${token}`
        }
        });
      dispatch(slice.actions.createSpecialityRegimenOfferingSuccess(response.data.specialityRegimenOffering));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function updateSpecialityRegimenOffering(specialityRegimenOfferingId, specialityRegimenOffering) {
  const token = localStorage.getItem('accessToken');
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.put(`/specialityRegimenOffering/${specialityRegimenOfferingId}`, specialityRegimenOffering,{
        headers: {
          'x-auth-token': `${token}`
        }
      });
      dispatch(slice.actions.updateSpecialityRegimenOfferingSuccess(response.data.specialityRegimenOffering));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}


// ----------------------------------------------------------------------

export function deleteSpecialityRegimenOffering(specialityRegimenOfferingId) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      await axios.delete(`/specialityRegimenOffering/${specialityRegimenOfferingId}`);
      dispatch(slice.actions.deleteSpecialityRegimenOfferingSuccess(specialityRegimenOfferingId));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
