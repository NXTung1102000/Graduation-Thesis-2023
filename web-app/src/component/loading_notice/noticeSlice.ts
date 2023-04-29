import { AlertColor } from '@mui/material';
import { createSlice } from '@reduxjs/toolkit';

import { RootState } from '../../store/store';

export interface INotice {
  open: boolean;
  type: AlertColor;
  message: string;
}

const initialState: INotice = {
  message: '',
  open: false,
  type: 'success' as AlertColor,
};

export const noticeSlice = createSlice({
  name: 'notice',
  initialState,
  reducers: {
    clearNotice: (state) => {
      state.open = false;
    },
    changeNotice: (state, action) => {
      state.message = action.payload.message;
      state.open = action.payload.open;
      state.type = action.payload.type;
    },
  },
});

export const { changeNotice, clearNotice } = noticeSlice.actions;
export const selectNotice = (state: RootState) => state.notice;
export default noticeSlice.reducer;
