import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from '../../utils/axios';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: null,
  courses: [],
  course: null,
  openModal: false,
  selectedCourseId: null,
  selectedRange: null,
};

const slice = createSlice({
  name: 'course',
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
    getCoursesSuccess(state, action) {
      state.isLoading = false;
      state.courses = action.payload;
    },

    // GET USER
    getCourseSuccess(state, action) {
      state.isLoading = false;
      state.course = action.payload;
    },

    // CREATE USER
    createCourseSuccess(state, action) {
      const newCourse = action.payload;
      state.isLoading = false;
      state.courses = [...state.courses, newCourse];
    },

    // UPDATE EVENT
    updateCourseSuccess(state, action) {
      state.isLoading = false;
      state.courses = state.courses.map((course) => {
        if (course.id_course === action.payload.id_course) {
          return action.payload;
        }
        return course;
      });
    },

    // DELETE EVENT
    deleteCourseSuccess(state, action) {
      const courseId = action.payload;
      state.courses = state.courses.filter((course) => course.id !== courseId);
    },

  },
});

// Reducer
export default slice.reducer;

// Actions
export const { getCoursesSuccess, getCourseSuccess, updateCourseSuccess, deleteCourseSuccess } = slice.actions;

// ----------------------------------------------------------------------

export function getCourses() {
  const token = localStorage.getItem('accessToken');
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/course',{
        headers: {
          'x-auth-token': `${token}`
        }
    });
      dispatch(slice.actions.getCoursesSuccess(response.data.courses));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getCourse(courseId) {
  const token = localStorage.getItem('accessToken');
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`/course/${courseId}`,{
        headers: {
          'x-auth-token': `${token}`
        }
      });
      dispatch(slice.actions.getCourseSuccess(response.data.course));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}


// ----------------------------------------------------------------------

export function createCourse(newCourse) {
  const token = localStorage.getItem('accessToken');
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post('/course', newCourse,{
        headers: {
          'x-auth-token': `${token}`
        }
        });
      dispatch(slice.actions.createCourseSuccess(response.data.course));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function updateCourse(courseId, course) {
  const token = localStorage.getItem('accessToken');
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.put(`/course/${courseId}`, course,{
        headers: {
          'x-auth-token': `${token}`
        }
      });
      dispatch(slice.actions.updateCourseSuccess(response.data.course));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}


// ----------------------------------------------------------------------

export function deleteCourse(courseId) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      await axios.delete(`/course/${courseId}`);
      dispatch(slice.actions.deleteCourseSuccess(courseId));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
