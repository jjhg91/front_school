import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from '../../utils/axios';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: null,
  modalitys: [],
  modality: null,
  openModal: false,
  selectedModalityId: null,
  selectedRange: null,
};

const slice = createSlice({
  name: 'modality',
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
    getModalitysSuccess(state, action) {
      state.isLoading = false;
      state.modalitys = action.payload;
    },

    // GET USER
    getModalitySuccess(state, action) {
      state.isLoading = false;
      state.modality = action.payload;
    },

    // CREATE USER
    createModalitySuccess(state, action) {
      const newModality = action.payload;
      state.isLoading = false;
      state.modalitys = [...state.modalitys, newModality];
    },

    // UPDATE EVENT
    updateModalitySuccess(state, action) {
      state.isLoading = false;
      state.modalitys = state.modalitys.map((modality) => {
        if (modality.id_modality === action.payload.id_modality) {
          return action.payload;
        }
        return modality;
      });
    },

    // DELETE EVENT
    deleteModalitySuccess(state, action) {
      const modalityId = action.payload;
      state.modalitys = state.modalitys.filter((modality) => modality.id !== modalityId);
    },

  },
});

// Reducer
export default slice.reducer;

// Actions
export const { getModalitysSuccess, getModalitySuccess, updateModalitySuccess, deleteModalitySuccess } = slice.actions;

// ----------------------------------------------------------------------

export function getModalitys() {
  const token = localStorage.getItem('accessToken');
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/modality',{
        headers: {
          'x-auth-token': `${token}`
        }
    });
      dispatch(slice.actions.getModalitysSuccess(response.data.modalitys));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getModality(modalityId) {
  const token = localStorage.getItem('accessToken');
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`/modality/${modalityId}`,{
        headers: {
          'x-auth-token': `${token}`
        }
      });
      dispatch(slice.actions.getModalitySuccess(response.data.modality));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}


// ----------------------------------------------------------------------

export function createModality(newModality) {
  const token = localStorage.getItem('accessToken');
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post('/modality', newModality,{
        headers: {
          'x-auth-token': `${token}`
        }
        });
      dispatch(slice.actions.createModalitySuccess(response.data.modality));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function updateModality(modalityId, modality) {
  const token = localStorage.getItem('accessToken');
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.put(`/modality/${modalityId}`, modality,{
        headers: {
          'x-auth-token': `${token}`
        }
      });
      dispatch(slice.actions.updateModalitySuccess(response.data.modality));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}


// ----------------------------------------------------------------------

export function deleteModality(modalityId) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      await axios.delete(`/modality/${modalityId}`);
      dispatch(slice.actions.deleteModalitySuccess(modalityId));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
