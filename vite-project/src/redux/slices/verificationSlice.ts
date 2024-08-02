import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface VerificationState {
  code: any;
}

const initialState: VerificationState = {
  code: null,
};

const verificationSlice = createSlice({
  name: 'verification',
  initialState,
  reducers: {
    setVerificationCode: (state, action: PayloadAction<any>) => {
      state.code = action.payload;
    },
  },
});

export const { setVerificationCode } = verificationSlice.actions;
export default verificationSlice.reducer;
