import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from '../../utils/axios';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: null,
  representatives: [],
  representative: null,
  openModal: false,
  selectedRepresentativeId: null,
  selectedRange: null,
};

const slice = createSlice({
  name: 'representative',
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

    // GET STUDENTS
    getRepresentativesSuccess(state, action) {
      state.isLoading = false;
      state.representatives = action.payload;
    },

    // GET STUDENT
    getRepresentativeSuccess(state, action) {
      state.isLoading = false;
      state.representative = action.payload;
    },

    // CREATE STUDENT
    createRepresentativeSuccess(state, action) {
      const newRepresentative = action.payload;
      state.isLoading = false;
      state.representatives = [...state.representatives, newRepresentative];
    },

    // UPDATE EVENT
    updateRepresentativeSuccess(state, action) {
      state.isLoading = false;
      state.representatives = state.representatives.map((representative) => {
        if (representative.id_representative === action.payload.id_representative) {
          return action.payload;
        }
        return representative;
      });
    },

    // DELETE EVENT
    deleteRepresentativeSuccess(state, action) {
      const representativeId = action.payload;
      state.representatives = state.representatives.filter((representative) => representative.id !== representativeId);
    },

  },
});

// Reducer
export default slice.reducer;

// Actions
export const { getRepresentativesSuccess, getRepresentativeSuccess, updateRepresentativeSuccess, deleteRepresentativeSuccess } = slice.actions;

// ----------------------------------------------------------------------

export function getRepresentatives() {
  const token = localStorage.getItem('accessToken');
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/representative',{
        headers: {
          'x-auth-token': `${token}`
        }
    });
      dispatch(slice.actions.getRepresentativesSuccess(response.data.representatives));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getRepresentative(representativeId) {
  const token = localStorage.getItem('accessToken');
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`/representative/${representativeId}`,{
        headers: {
          'x-auth-token': `${token}`
        }
      });
      dispatch(slice.actions.getRepresentativeSuccess(response.data.representative));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}


// ----------------------------------------------------------------------

export function createRepresentative(newRepresentative) {
  const token = localStorage.getItem('accessToken');
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post('/representative', newRepresentative,{
        headers: {
          'x-auth-token': `${token}`
        }
        });
      dispatch(slice.actions.createRepresentativeSuccess(response.data.representative));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function updateRepresentative(representativeId, representative) {
  const token = localStorage.getItem('accessToken');
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.put(`/representative/${representativeId}`, representative,{
        headers: {
          'x-auth-token': `${token}`
        }
      });
      dispatch(slice.actions.updateRepresentativeSuccess(response.data.representative));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}


// ----------------------------------------------------------------------

export function deleteRepresentative(representativeId) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      await axios.delete(`/representative/${representativeId}`);
      dispatch(slice.actions.deleteRepresentativeSuccess(representativeId));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
