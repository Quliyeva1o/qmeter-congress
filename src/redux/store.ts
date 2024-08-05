import { configureStore } from '@reduxjs/toolkit';
import registerReducer from './slices/registerSlice';
import verificationReducer from './slices/verificationSlice';
import questionsReducer from './slices/questionsSlice'; 

const store = configureStore({
  reducer: {
    register: registerReducer,
    verification: verificationReducer,
    questions: questionsReducer, 
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
