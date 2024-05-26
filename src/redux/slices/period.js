import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from '../../utils/axios';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: null,
  periods: [],
  period: null,
  openModal: false,
  selectedPeriodId: null,
  selectedRange: null,
};

const slice = createSlice({
  name: 'period',
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
    getPeriodsSuccess(state, action) {
      state.isLoading = false;
      state.periods = action.payload;
    },

    // GET USER
    getPeriodSuccess(state, action) {
      state.isLoading = false;
      state.period = action.payload;
    },

    // CREATE USER
    createPeriodSuccess(state, action) {
      const newPeriod = action.payload;
      state.isLoading = false;
      state.periods = [...state.periods, newPeriod];
    },

    // UPDATE EVENT
    updatePeriodSuccess(state, action) {
      state.isLoading = false;
      state.periods = state.periods.map((period) => {
        if (period.id_period === action.payload.id_period) {
          return action.payload;
        }
        return period;
      });
    },

    // DELETE EVENT
    deletePeriodSuccess(state, action) {
      const periodId = action.payload;
      state.periods = state.periods.filter((period) => period.id !== periodId);
    },

  },
});

// Reducer
export default slice.reducer;

// Actions
export const { getPeriodsSuccess, getPeriodSuccess, updatePeriodSuccess, deletePeriodSuccess } = slice.actions;

// ----------------------------------------------------------------------

export function getPeriods() {
  const token = localStorage.getItem('accessToken');
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/period',{
        headers: {
          'x-auth-token': `${token}`
        }
    });
      dispatch(slice.actions.getPeriodsSuccess(response.data.periods));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getPeriod(periodId) {
  const token = localStorage.getItem('accessToken');
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`/period/${periodId}`,{
        headers: {
          'x-auth-token': `${token}`
        }
      });
      dispatch(slice.actions.getPeriodSuccess(response.data.period));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}


// ----------------------------------------------------------------------

export function createPeriod(newPeriod) {
  const token = localStorage.getItem('accessToken');
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post('/period', newPeriod,{
        headers: {
          'x-auth-token': `${token}`
        }
        });
      dispatch(slice.actions.createPeriodSuccess(response.data.period));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function updatePeriod(periodId, period) {
  const token = localStorage.getItem('accessToken');
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.put(`/period/${periodId}`, period,{
        headers: {
          'x-auth-token': `${token}`
        }
      });
      dispatch(slice.actions.updatePeriodSuccess(response.data.period));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}


// ----------------------------------------------------------------------

export function deletePeriod(periodId) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      await axios.delete(`/period/${periodId}`);
      dispatch(slice.actions.deletePeriodSuccess(periodId));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
