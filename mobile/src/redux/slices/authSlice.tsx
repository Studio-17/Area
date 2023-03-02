import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import {
  LogInGoogleRequest,
  LoginRequest,
  RegisterRequest,
} from "../models/authModel";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RootState } from "../store/store";
// import { REACT_NATIVE_APP_API_URL } from "@env";

const API_ENDPOINT = "http://localhost:8080/api/reaccoon";
// const API_ENDPOINT = process.env.REACT_NATIVE_APP_API_URL;

let userToken = null;

const tmp = async () => {
  let Token = await AsyncStorage.getItem("userToken");
  if (Token !== null) {
    userToken = Token;
    return userToken;
  }
};

export interface AuthState {
  user: null | any;
  token: null | string;
  loading: null | boolean;
  error: null | any;
  success: null | any;
  isError: boolean;
}

const initialState = {
  user: null,
  token: userToken,
  loading: false,
  error: null,
  success: null,
  isError: false,
} as {
  user: null | any;
  token: null | string;
  loading: null | boolean;
  error: null | any;
  success: null | any;
  isError: boolean;
};

export const loginUserGoogle = createAsyncThunk(
  "auth/loginGoogle",
  async ({ token }: LogInGoogleRequest, { rejectWithValue }) => {
    try {
      const { data } = await axios
        .get(`${API_ENDPOINT}/authentication/login/mobile/google`, {
          params: { token: token },
          headers: { "Content-Type": "application/json" },
        })
        .then((res) => res);
      await AsyncStorage.setItem("userToken", data.accessToken);
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
      await AsyncStorage.setItem("userToken", data.accessToken);
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
      AsyncStorage.removeItem("userToken");
      state.loading = false;
      state.user = null;
      state.token = null;
      state.error = null;
      state.success = null;
      state.isError = false;
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
        state.isError = false;
      })
      .addCase(registerUser.rejected, (state: AuthState, { payload }: any) => {
        state.loading = false;
        state.error = payload;
        state.isError = true;
      })
      .addCase(loginUser.pending, (state: AuthState) => {
        state.loading = true;
        state.error = null;
        state.isError = false;
      })
      .addCase(loginUser.fulfilled, (state: AuthState, { payload }) => {
        state.loading = false;
        state.user = payload.user;
        state.token = payload.accessToken;
      })
      .addCase(loginUser.rejected, (state: AuthState, { payload }) => {
        state.loading = false;
        state.error = payload;
        state.isError = true;
      })
      .addCase(loginUserGoogle.pending, (state: AuthState) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUserGoogle.fulfilled, (state: AuthState, { payload }) => {
        state.loading = false;
        state.user = payload.user;
        state.token = payload.accessToken;
        state.isError = false;
      })
      .addCase(
        loginUserGoogle.rejected,
        (state: AuthState, { payload }: any) => {
          state.loading = false;
          state.error = payload;
          state.isError = true;
        }
      );
  },
});

export const { setCredentials, logoutUser } = slice.actions;

export default slice.reducer;

export const selectCurrentUser = (state: RootState) => state.auth.user;
