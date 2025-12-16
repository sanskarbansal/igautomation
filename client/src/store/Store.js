import { configureStore } from '@reduxjs/toolkit';
import CustomizerReducer from './customizer/CustomizerSlice';

import AuthReducer from './auth/AuthSlice';
import ToastReducer from './toast/ToastSlice';
import toastMiddleware from './middleware/toastMiddleware';

export const store = configureStore({
  reducer: {
    customizer: CustomizerReducer,
    auth: AuthReducer,
    toast: ToastReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(toastMiddleware),
});

export default store;
