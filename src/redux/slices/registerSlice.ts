import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { UserTypes } from "../../types/index";


const loadStateFromCookie = (): UserTypes => {
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

const saveStateToCookie = (state: UserTypes) => {
  Cookies.set("registerData", JSON.stringify(state), { expires: 7 });
};

const initialState: UserTypes = loadStateFromCookie();

const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    setRegisterData: (state, action: PayloadAction<UserTypes>) => {
      const updatedState = { ...state, ...action.payload };
      saveStateToCookie(updatedState);
      return updatedState;
    },
  },
});

export const { setRegisterData } = registerSlice.actions;
export default registerSlice.reducer;
