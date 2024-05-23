import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from '../../utils/axios';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: null,
  shifts: [],
  shift: null,
  openModal: false,
  selectedShiftId: null,
  selectedRange: null,
};

const slice = createSlice({
  name: 'shift',
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
    getShiftsSuccess(state, action) {
      state.isLoading = false;
      state.shifts = action.payload;
    },

    // GET USER
    getShiftSuccess(state, action) {
      state.isLoading = false;
      state.shift = action.payload;
    },

    // CREATE USER
    createShiftSuccess(state, action) {
      const newShift = action.payload;
      state.isLoading = false;
      state.shifts = [...state.shifts, newShift];
    },

    // UPDATE EVENT
    updateShiftSuccess(state, action) {
      state.isLoading = false;
      state.shifts = state.shifts.map((shift) => {
        if (shift.id_shift === action.payload.id_shift) {
          return action.payload;
        }
        return shift;
      });
    },

    // DELETE EVENT
    deleteShiftSuccess(state, action) {
      const shiftId = action.payload;
      state.shifts = state.shifts.filter((shift) => shift.id !== shiftId);
    },

  },
});

// Reducer
export default slice.reducer;

// Actions
export const { getShiftsSuccess, getShiftSuccess, updateShiftSuccess, deleteShiftSuccess } = slice.actions;

// ----------------------------------------------------------------------

export function getShifts() {
  const token = localStorage.getItem('accessToken');
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/shift',{
        headers: {
          'x-auth-token': `${token}`
        }
    });
      dispatch(slice.actions.getShiftsSuccess(response.data.shifts));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getShift(shiftId) {
  const token = localStorage.getItem('accessToken');
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`/shift/${shiftId}`,{
        headers: {
          'x-auth-token': `${token}`
        }
      });
      dispatch(slice.actions.getShiftSuccess(response.data.shift));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}


// ----------------------------------------------------------------------

export function createShift(newShift) {
  const token = localStorage.getItem('accessToken');
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post('/shift', newShift,{
        headers: {
          'x-auth-token': `${token}`
        }
        });
      dispatch(slice.actions.createShiftSuccess(response.data.shift));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function updateShift(shiftId, shift) {
  const token = localStorage.getItem('accessToken');
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.put(`/shift/${shiftId}`, shift,{
        headers: {
          'x-auth-token': `${token}`
        }
      });
      dispatch(slice.actions.updateShiftSuccess(response.data.shift));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}


// ----------------------------------------------------------------------

export function deleteShift(shiftId) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      await axios.delete(`/shift/${shiftId}`);
      dispatch(slice.actions.deleteShiftSuccess(shiftId));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
