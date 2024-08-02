import { configureStore } from '@reduxjs/toolkit';
import registerReducer from './slices/registerSlice';
import verificationReducer from './slices/verificationSlice';  

const store = configureStore({
  reducer: {
    register: registerReducer,
    verification: verificationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
