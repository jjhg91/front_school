import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from '../../utils/axios';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: null,
  invoices: [],
  invoice: null,
  invoiceStudent: [],
  openModal: false,
  selectedInvoiceId: null,
  selectedRange: null,
};

const slice = createSlice({
  name: 'invoice',
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
    getInvoicesSuccess(state, action) {
      state.isLoading = false;
      state.invoices = action.payload;
    },

    // GET USER
    getInvoiceSuccess(state, action) {
      state.isLoading = false;
      state.invoice = action.payload;
    },

    // GET USER STUDENT
    getInvoiceStudentSuccess(state, action) {
      state.isLoading = false;
      state.invoiceStudent = action.payload;
    },

    // CREATE USER
    createInvoiceSuccess(state, action) {
      const newInvoice = action.payload;
      state.isLoading = false;
      state.invoices = [...state.invoices, newInvoice];
    },

    // UPDATE EVENT
    updateInvoiceSuccess(state, action) {
      state.isLoading = false;
      state.invoices = state.invoices.map((invoice) => {
        if (invoice.id_invoice === action.payload.id_invoice) {
          return action.payload;
        }
        return invoice;
      });
    },

    // DELETE EVENT
    deleteInvoiceSuccess(state, action) {
      const invoiceId = action.payload;
      state.invoices = state.invoices.filter((invoice) => invoice.id !== invoiceId);
    },

  },
});

// Reducer
export default slice.reducer;

// Actions
export const { getInvoicesSuccess, getInvoiceSuccess, getInvoiceStudentSuccess, updateInvoiceSuccess, deleteInvoiceSuccess } = slice.actions;

// ----------------------------------------------------------------------

export function getInvoices() {
  const token = localStorage.getItem('accessToken');
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/invoice',{
        headers: {
          'x-auth-token': `${token}`
        }
    });
      dispatch(slice.actions.getInvoicesSuccess(response.data.invoices));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getInvoice(invoiceId) {
  const token = localStorage.getItem('accessToken');
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`/invoice/${invoiceId}`,{
        headers: {
          'x-auth-token': `${token}`
        }
      });
      dispatch(slice.actions.getInvoiceSuccess(response.data.invoice));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getInvoiceStudent(invoiceId) {
  const token = localStorage.getItem('accessToken');
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`/invoice/student/${invoiceId}`,{
        headers: {
          'x-auth-token': `${token}`
        }
      });
      dispatch(slice.actions.getInvoiceStudentSuccess(response.data.invoiceStudent));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}


// ----------------------------------------------------------------------

export function createInvoice(newInvoice) {
  const token = localStorage.getItem('accessToken');
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post('/invoice', newInvoice,{
        headers: {
          'x-auth-token': `${token}`
        }
        });
      dispatch(slice.actions.createInvoiceSuccess(response.data.invoice));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function updateInvoice(invoiceId, invoice) {
  const token = localStorage.getItem('accessToken');
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.put(`/invoice/${invoiceId}`, invoice,{
        headers: {
          'x-auth-token': `${token}`
        }
      });
      dispatch(slice.actions.updateInvoiceSuccess(response.data.invoice));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}


// ----------------------------------------------------------------------

export function deleteInvoice(invoiceId) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      await axios.delete(`/invoice/${invoiceId}`);
      dispatch(slice.actions.deleteInvoiceSuccess(invoiceId));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
