import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { Iuser } from "../../types/index";


const loadStateFromCookie = (): Iuser => {
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

const saveStateToCookie = (state: Iuser) => {
  Cookies.set("registerData", JSON.stringify(state), { expires: 7 });
};

const initialState: Iuser = loadStateFromCookie();

const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    setRegisterData: (state, action: PayloadAction<Iuser>) => {
      const updatedState = { ...state, ...action.payload };
      saveStateToCookie(updatedState);
      return updatedState;
    },
  },
});

export const { setRegisterData } = registerSlice.actions;
export default registerSlice.reducer;
