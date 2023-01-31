import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store/store";

const slice = createSlice({
  name: "auth",
  initialState: { user: null, token: null } as {
    user: null | any;
    token: null | string;
  },
  reducers: {
    setCredentials: (
      state,
      { payload: { user, token } }: PayloadAction<{ user: any; token: string }>
    ) => {
      state.user = user;
      state.token = token;
    },
  },
  extraReducers: (builder) => {},
});

export const { setCredentials } = slice.actions;

export default slice.reducer;

export const selectCurrentUser = (state: RootState) => state.auth.user;
