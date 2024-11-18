import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from '../../utils/axios';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: null,
  teachers: [],
  teacher: null,
  openModal: false,
  selectedTeacherId: null,
  selectedRange: null,
};

const slice = createSlice({
  name: 'teacher',
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
    getTeachersSuccess(state, action) {
      state.isLoading = false;
      state.teachers = action.payload;
    },

    // GET STUDENT
    getTeacherSuccess(state, action) {
      state.isLoading = false;
      state.teacher = action.payload;
    },

    // CREATE STUDENT
    createTeacherSuccess(state, action) {
      const newTeacher = action.payload;
      state.isLoading = false;
      state.teachers = [...state.teachers, newTeacher];
    },

    // UPDATE EVENT
    updateTeacherSuccess(state, action) {
      state.isLoading = false;
      state.teachers = state.teachers.map((teacher) => {
        if (teacher.id_teacher === action.payload.id_teacher) {
          return action.payload;
        }
        return teacher;
      });
    },

    // DELETE EVENT
    deleteTeacherSuccess(state, action) {
      const teacherId = action.payload;
      state.teachers = state.teachers.filter((teacher) => teacher.id !== teacherId);
    },

  },
});

// Reducer
export default slice.reducer;

// Actions
export const { getTeachersSuccess, getTeacherSuccess, updateTeacherSuccess, deleteTeacherSuccess } = slice.actions;

// ----------------------------------------------------------------------

export function getTeachers() {
  const token = localStorage.getItem('accessToken');
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/teacher',{
        headers: {
          'x-auth-token': `${token}`
        }
    });
      dispatch(slice.actions.getTeachersSuccess(response.data.teachers));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getTeacher(teacherId) {
  const token = localStorage.getItem('accessToken');
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`/teacher/${teacherId}`,{
        headers: {
          'x-auth-token': `${token}`
        }
      });
      dispatch(slice.actions.getTeacherSuccess(response.data.teacher));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}


// ----------------------------------------------------------------------

export function createTeacher(newTeacher) {
  const token = localStorage.getItem('accessToken');
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post('/teacher', newTeacher,{
        headers: {
          'x-auth-token': `${token}`
        }
        });
      dispatch(slice.actions.createTeacherSuccess(response.data.teacher));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function updateTeacher(teacherId, teacher) {
  const token = localStorage.getItem('accessToken');
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.put(`/teacher/${teacherId}`, teacher,{
        headers: {
          'x-auth-token': `${token}`
        }
      });
      dispatch(slice.actions.updateTeacherSuccess(response.data.teacher));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}


// ----------------------------------------------------------------------

export function deleteTeacher(teacherId) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      await axios.delete(`/teacher/${teacherId}`);
      dispatch(slice.actions.deleteTeacherSuccess(teacherId));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
