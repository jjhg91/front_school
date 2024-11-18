import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from '../../utils/axios';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: null,
  productServices: [],
  productService: null,
  openModal: false,
  selectedProductServiceId: null,
  selectedRange: null,
};

const slice = createSlice({
  name: 'productService',
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
    getProductServicesSuccess(state, action) {
      state.isLoading = false;
      state.productServices = action.payload;
    },

    // GET USER
    getProductServiceSuccess(state, action) {
      state.isLoading = false;
      state.productService = action.payload;
    },

    // CREATE USER
    createProductServiceSuccess(state, action) {
      const newProductService = action.payload;
      state.isLoading = false;
      state.productServices = [...state.productServices, newProductService];
    },

    // UPDATE EVENT
    updateProductServiceSuccess(state, action) {
      state.isLoading = false;
      state.productServices = state.productServices.map((productService) => {
        if (productService.id_productService === action.payload.id_productService) {
          return action.payload;
        }
        return productService;
      });
    },

    // DELETE EVENT
    deleteProductServiceSuccess(state, action) {
      const productServiceId = action.payload;
      state.productServices = state.productServices.filter((productService) => productService.id !== productServiceId);
    },

  },
});

// Reducer
export default slice.reducer;

// Actions
export const { getProductServicesSuccess, getProductServiceSuccess, updateProductServiceSuccess, deleteProductServiceSuccess } = slice.actions;

// ----------------------------------------------------------------------

export function getProductServices() {
  const token = localStorage.getItem('accessToken');
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/productService',{
        headers: {
          'x-auth-token': `${token}`
        }
    });
      dispatch(slice.actions.getProductServicesSuccess(response.data.productServices));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getProductService(productServiceId) {
  const token = localStorage.getItem('accessToken');
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`/productService/${productServiceId}`,{
        headers: {
          'x-auth-token': `${token}`
        }
      });
      dispatch(slice.actions.getProductServiceSuccess(response.data.productService));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}


// ----------------------------------------------------------------------

export function createProductService(newProductService) {
  const token = localStorage.getItem('accessToken');
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post('/productService', newProductService,{
        headers: {
          'x-auth-token': `${token}`
        }
        });
      dispatch(slice.actions.createProductServiceSuccess(response.data.productService));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function updateProductService(productServiceId, productService) {
  const token = localStorage.getItem('accessToken');
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.put(`/productService/${productServiceId}`, productService,{
        headers: {
          'x-auth-token': `${token}`
        }
      });
      dispatch(slice.actions.updateProductServiceSuccess(response.data.productService));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}


// ----------------------------------------------------------------------

export function deleteProductService(productServiceId) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      await axios.delete(`/productService/${productServiceId}`);
      dispatch(slice.actions.deleteProductServiceSuccess(productServiceId));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
