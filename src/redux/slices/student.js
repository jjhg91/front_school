import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from '../../utils/axios';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: null,
  students: [],
  student: null,
  openModal: false,
  selectedStudentId: null,
  selectedRange: null,
};

const slice = createSlice({
  name: 'student',
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
    getStudentsSuccess(state, action) {
      state.isLoading = false;
      state.students = action.payload;
    },

    // GET STUDENT
    getStudentSuccess(state, action) {
      state.isLoading = false;
      state.student = action.payload;
    },

    // CREATE STUDENT
    createStudentSuccess(state, action) {
      const newStudent = action.payload;
      state.isLoading = false;
      state.students = [...state.students, newStudent];
    },

    // UPDATE EVENT
    updateStudentSuccess(state, action) {
      state.isLoading = false;
      state.students = state.students.map((student) => {
        if (student.id_student === action.payload.id_student) {
          return action.payload;
        }
        return student;
      });
    },

    // DELETE EVENT
    deleteStudentSuccess(state, action) {
      const studentId = action.payload;
      state.students = state.students.filter((student) => student.id !== studentId);
    },

  },
});

// Reducer
export default slice.reducer;

// Actions
export const { getStudentsSuccess, getStudentSuccess, updateStudentSuccess, deleteStudentSuccess } = slice.actions;

// ----------------------------------------------------------------------

export function getStudents() {
  const token = localStorage.getItem('accessToken');
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/student',{
        headers: {
          'x-auth-token': `${token}`
        }
    });
      dispatch(slice.actions.getStudentsSuccess(response.data.students));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getStudent(studentId) {
  const token = localStorage.getItem('accessToken');
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`/student/${studentId}`,{
        headers: {
          'x-auth-token': `${token}`
        }
      });
      dispatch(slice.actions.getStudentSuccess(response.data.student));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}


// ----------------------------------------------------------------------

export function createStudent(newStudent) {
  const token = localStorage.getItem('accessToken');
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post('/student', newStudent,{
        headers: {
          'x-auth-token': `${token}`
        }
        });
      dispatch(slice.actions.createStudentSuccess(response.data.student));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function updateStudent(studentId, student) {
  const token = localStorage.getItem('accessToken');
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.put(`/student/${studentId}`, student,{
        headers: {
          'x-auth-token': `${token}`
        }
      });
      dispatch(slice.actions.updateStudentSuccess(response.data.student));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}


// ----------------------------------------------------------------------

export function deleteStudent(studentId) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      await axios.delete(`/student/${studentId}`);
      dispatch(slice.actions.deleteStudentSuccess(studentId));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
