import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store/store";
import {
  LogInGoogleRequest,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
} from "../models/authModel";
import axios from "axios";

const API_ENDPOINT = process.env.REACT_APP_API_URL;

const userToken = localStorage.getItem("userToken")
  ? localStorage.getItem("userToken")
  : null;

export interface AuthState {
  user: null | any;
  token: null | string;
  loading: null | boolean;
  error: null | any;
  success: null | any;
}

const initialState = {
  user: null,
  token: userToken,
  loading: false,
  error: null,
  success: null,
} as {
  user: null | any;
  token: null | string;
  loading: null | boolean;
  error: null | any;
  success: null | any;
};

export const registerUser = createAsyncThunk(
  "auth/register",
  async (
    { firstName, lastName, email, password }: RegisterRequest,
    { rejectWithValue }
  ) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      await axios.post(
        `${API_ENDPOINT}/authentication/register`,
        {
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
        },
        config
      );
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const loginUserGoogle = createAsyncThunk(
  "auth/loginGoogle",
  async ({ credentials }: LogInGoogleRequest, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        `${API_ENDPOINT}/authentication/login/google`,
        { credentials: credentials },
        config
      );
      localStorage.setItem("userToken", data.accessToken);
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ email, password }: LoginRequest, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        `${API_ENDPOINT}/authentication/login`,
        { email: email, password: password },
        config
      );
      localStorage.setItem("userToken", data.accessToken);
      return data;
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      { payload: { user, token } }: PayloadAction<{ user: any; token: string }>
    ) => {
      state.user = user;
      state.token = token;
    },
    logoutUser: (state: AuthState) => {
      localStorage.removeItem("userToken");
      state.loading = false;
      state.user = null;
      state.token = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state: AuthState) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state: AuthState, { payload }: any) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(registerUser.rejected, (state: AuthState, { payload }: any) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(loginUser.pending, (state: AuthState) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state: AuthState, { payload }) => {
        state.loading = false;
        state.user = payload.user;
        state.token = payload.accessToken;
      })
      .addCase(loginUser.rejected, (state: AuthState, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(loginUserGoogle.pending, (state: AuthState) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        loginUserGoogle.fulfilled,
        (state: AuthState, { payload }: any) => {
          state.loading = false;
          state.success = true;
          state.user = payload.user;
          state.token = payload.accessToken
        }
      )
      .addCase(
        loginUserGoogle.rejected,
        (state: AuthState, { payload }: any) => {
          state.loading = false;
          state.error = payload;
        }
      );
  },
});

export const { setCredentials, logoutUser } = slice.actions;

export default slice.reducer;

export const selectCurrentUser = (state: RootState) => state.auth.user;
