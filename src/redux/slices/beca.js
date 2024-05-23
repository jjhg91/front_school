import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from '../../utils/axios';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: null,
  becas: [],
  beca: null,
  openModal: false,
  selectedBecaId: null,
  selectedRange: null,
};

const slice = createSlice({
  name: 'beca',
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
    getBecasSuccess(state, action) {
      state.isLoading = false;
      state.becas = action.payload;
    },

    // GET USER
    getBecaSuccess(state, action) {
      state.isLoading = false;
      state.beca = action.payload;
    },

    // CREATE USER
    createBecaSuccess(state, action) {
      const newBeca = action.payload;
      state.isLoading = false;
      state.becas = [...state.becas, newBeca];
    },

    // UPDATE EVENT
    updateBecaSuccess(state, action) {
      state.isLoading = false;
      state.becas = state.becas.map((beca) => {
        if (beca.id_beca === action.payload.id_beca) {
          return action.payload;
        }
        return beca;
      });
    },

    // DELETE EVENT
    deleteBecaSuccess(state, action) {
      const becaId = action.payload;
      state.becas = state.becas.filter((beca) => beca.id !== becaId);
    },

  },
});

// Reducer
export default slice.reducer;

// Actions
export const { getBecasSuccess, getBecaSuccess, updateBecaSuccess, deleteBecaSuccess } = slice.actions;

// ----------------------------------------------------------------------

export function getBecas() {
  const token = localStorage.getItem('accessToken');
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/beca',{
        headers: {
          'x-auth-token': `${token}`
        }
    });
      dispatch(slice.actions.getBecasSuccess(response.data.becas));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getBeca(becaId) {
  const token = localStorage.getItem('accessToken');
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`/beca/${becaId}`,{
        headers: {
          'x-auth-token': `${token}`
        }
      });
      dispatch(slice.actions.getBecaSuccess(response.data.beca));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}


// ----------------------------------------------------------------------

export function createBeca(newBeca) {
  const token = localStorage.getItem('accessToken');
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post('/beca', newBeca,{
        headers: {
          'x-auth-token': `${token}`
        }
        });
      dispatch(slice.actions.createBecaSuccess(response.data.beca));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function updateBeca(becaId, beca) {
  const token = localStorage.getItem('accessToken');
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.put(`/beca/${becaId}`, beca,{
        headers: {
          'x-auth-token': `${token}`
        }
      });
      dispatch(slice.actions.updateBecaSuccess(response.data.beca));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}


// ----------------------------------------------------------------------

export function deleteBeca(becaId) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      await axios.delete(`/beca/${becaId}`);
      dispatch(slice.actions.deleteBecaSuccess(becaId));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
