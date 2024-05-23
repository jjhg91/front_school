import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from '../../utils/axios';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: null,
  users: [],
  user: null,
  openModal: false,
  selectedUserId: null,
  selectedRange: null,
};

const slice = createSlice({
  name: 'user',
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
    getUsersSuccess(state, action) {
      state.isLoading = false;
      state.users = action.payload;
    },

    // GET USER
    getUserSuccess(state, action) {
      state.isLoading = false;
      state.user = action.payload;
    },

    // CREATE USER
    createUserSuccess(state, action) {
      const newUser = action.payload;
      state.isLoading = false;
      state.users = [...state.users, newUser];
    },

    // UPDATE EVENT
    updateUserSuccess(state, action) {
      state.isLoading = false;
      state.users = state.users.map((user) => {
        if (user.id_user === action.payload.id_user) {
          return action.payload;
        }
        return user;
      });
    },

    // DELETE EVENT
    deleteUserSuccess(state, action) {
      const userId = action.payload;
      state.users = state.users.filter((user) => user.id !== userId);
    },

  },
});

// Reducer
export default slice.reducer;

// Actions
export const { getUsersSuccess, getUserSuccess, updateUserSuccess, deleteUserSuccess } = slice.actions;

// ----------------------------------------------------------------------

export function getUsers() {
  const token = localStorage.getItem('accessToken');
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/user',{
        headers: {
          'x-auth-token': `${token}`
        }
    });
      dispatch(slice.actions.getUsersSuccess(response.data.users));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getUser(userId) {
  const token = localStorage.getItem('accessToken');
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`/user/${userId}`,{
        headers: {
          'x-auth-token': `${token}`
        }
      });
      dispatch(slice.actions.getUserSuccess(response.data.user));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}


// ----------------------------------------------------------------------

export function createUser(newUser) {
  const token = localStorage.getItem('accessToken');
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post('/user', newUser,{
        headers: {
          'x-auth-token': `${token}`
        }
        });
      dispatch(slice.actions.createUserSuccess(response.data.user));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function updateUser(userId, user) {
  const token = localStorage.getItem('accessToken');
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.put(`/user/${userId}`, user,{
        headers: {
          'x-auth-token': `${token}`
        }
      });
      dispatch(slice.actions.updateUserSuccess(response.data.user));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}


// ----------------------------------------------------------------------

export function deleteUser(userId) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      await axios.delete(`/user/${userId}`);
      dispatch(slice.actions.deleteUserSuccess(userId));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
