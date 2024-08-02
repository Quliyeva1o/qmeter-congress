import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface RegisterState {
  name: string;
  phone: string;
  email: string;
}

const initialState: RegisterState = {
  name: '',
  phone: '',
  email: '',
};

const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    setRegisterData: (state, action: PayloadAction<RegisterState>) => {
      state.name = action.payload.name;
      state.phone = action.payload.phone;
      state.email = action.payload.email;
    },
  },
});

export const { setRegisterData } = registerSlice.actions;
export default registerSlice.reducer;
