import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  darkmode: JSON.parse(localStorage.getItem("darkmode") ?? "false"),
  loading: true,
  templete:null
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setloading: (state, action) => {
      state.loading = action.payload;
    },
    setDarkmode: (state) => {
      state.darkmode = !state.darkmode;
      localStorage.setItem("darkmode", JSON.stringify(state.darkmode));
    },
    settemplete: (state,action) => {
      state.templete=action.payload
    }
  },
});

// Action creators are generated for each case reducer function
export const { setUser, setloading, setDarkmode , settemplete } = userSlice.actions;

export default userSlice.reducer;
