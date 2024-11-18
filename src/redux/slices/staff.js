import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from '../../utils/axios';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: null,
  staffs: [],
  staff: null,
  openModal: false,
  selectedStaffId: null,
  selectedRange: null,
};

const slice = createSlice({
  name: 'staff',
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
    getStaffsSuccess(state, action) {
      state.isLoading = false;
      state.staffs = action.payload;
    },

    // GET STUDENT
    getStaffSuccess(state, action) {
      state.isLoading = false;
      state.staff = action.payload;
    },

    // CREATE STUDENT
    createStaffSuccess(state, action) {
      const newStaff = action.payload;
      state.isLoading = false;
      state.staffs = [...state.staffs, newStaff];
    },

    // UPDATE EVENT
    updateStaffSuccess(state, action) {
      state.isLoading = false;
      state.staffs = state.staffs.map((staff) => {
        if (staff.id_staff === action.payload.id_staff) {
          return action.payload;
        }
        return staff;
      });
    },

    // DELETE EVENT
    deleteStaffSuccess(state, action) {
      const staffId = action.payload;
      state.staffs = state.staffs.filter((staff) => staff.id !== staffId);
    },

  },
});

// Reducer
export default slice.reducer;

// Actions
export const { getStaffsSuccess, getStaffSuccess, updateStaffSuccess, deleteStaffSuccess } = slice.actions;

// ----------------------------------------------------------------------

export function getStaffs() {
  const token = localStorage.getItem('accessToken');
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/staff',{
        headers: {
          'x-auth-token': `${token}`
        }
    });
      dispatch(slice.actions.getStaffsSuccess(response.data.staffs));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getStaff(staffId) {
  const token = localStorage.getItem('accessToken');
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`/staff/${staffId}`,{
        headers: {
          'x-auth-token': `${token}`
        }
      });
      dispatch(slice.actions.getStaffSuccess(response.data.staff));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}


// ----------------------------------------------------------------------

export function createStaff(newStaff) {
  const token = localStorage.getItem('accessToken');
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post('/staff', newStaff,{
        headers: {
          'x-auth-token': `${token}`
        }
        });
      dispatch(slice.actions.createStaffSuccess(response.data.staff));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function updateStaff(staffId, staff) {
  const token = localStorage.getItem('accessToken');
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.put(`/staff/${staffId}`, staff,{
        headers: {
          'x-auth-token': `${token}`
        }
      });
      dispatch(slice.actions.updateStaffSuccess(response.data.staff));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}


// ----------------------------------------------------------------------

export function deleteStaff(staffId) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      await axios.delete(`/staff/${staffId}`);
      dispatch(slice.actions.deleteStaffSuccess(staffId));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
