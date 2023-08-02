import { createSlice } from '@reduxjs/toolkit';

import { RootState } from '../../store/store';

export interface ISignIn {
  open: boolean;
}

const initialState: ISignIn = {
  open: false,
};

export const signInSlice = createSlice({
  name: 'signIn',
  initialState,
  reducers: {
    setOpenSignIn: (state, action) => {
      state.open = action.payload.open;
    },
  },
});

export const { setOpenSignIn } = signInSlice.actions;
export const selectSignIn = (state: RootState) => state.loginOpen;
export default signInSlice.reducer;
