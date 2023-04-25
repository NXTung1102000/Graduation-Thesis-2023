import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { loginAPI, registerAPI } from '../../api/auth';
import { IAuthState, ICreateUser, IInputUser } from '../../constant/interface/user';
import { RootState } from '../../store/store';

const initialState: IAuthState = {
  token: null,
  user: {
    id: 0,
    email: '',
    name: '',
  },
};

export const LogInAsync = createAsyncThunk('auth/login', async (user: IInputUser) => {
  const response = await loginAPI(user);
  return response.data.data;
});

export const RegisterAsync = createAsyncThunk('auth/register', async (user: ICreateUser) => {
  const response = await registerAPI(user);
  return response.data.data;
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    LogInUser: (state, action) => {
      state.token = action.payload.token;
      state.user.email = action.payload.email;
    },
    LogOutUser: () => {
      return initialState;
    },
  },
});

export const { LogOutUser, LogInUser } = authSlice.actions;
export const selectAuth = (state: RootState) => state.auth;
export default authSlice.reducer;
