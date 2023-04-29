import { createSlice } from '@reduxjs/toolkit';

import { RootState } from '../../store/store';

const initialState = {
  isLoading: false,
}; // default is not loading

export const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    changeLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { changeLoading } = loadingSlice.actions;
export const selectLoading = (state: RootState) => state.isLoading;
export default loadingSlice.reducer;
