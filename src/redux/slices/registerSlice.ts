import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

interface RegisterState {
  name: string;
  phone: string;
  email: string;
}

const loadStateFromCookie = (): RegisterState => {
  const cookieValue = Cookies.get("registerData");
  if (cookieValue) {
    try {
      return JSON.parse(cookieValue);
    } catch {
      return { name: "", phone: "", email: "" };
    }
  }
  return { name: "", phone: "", email: "" };
};

const saveStateToCookie = (state: RegisterState) => {
  Cookies.set("registerData", JSON.stringify(state), { expires: 7 });
};

const initialState: RegisterState = loadStateFromCookie();

const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    setRegisterData: (state, action: PayloadAction<RegisterState>) => {
      const updatedState = { ...state, ...action.payload };
      saveStateToCookie(updatedState);
      return updatedState;
    },
  },
});

export const { setRegisterData } = registerSlice.actions;
export default registerSlice.reducer;
