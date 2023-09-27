import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IToast } from '../../components/Toast/Toast';

interface toastListState {
  values: IToast[];
}

const initialState: toastListState = {
  values: [],
};

const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    showToast(state, action: PayloadAction<{message: string, type: string}>) {
      const { message, type } = action.payload;
      const toast: IToast = {
        id: Date.now(),
        message,
        type,
      };

      state.values.push(toast);
    },
    removeToast(state, action: PayloadAction<number>) {
      state.values = state.values.filter((toast) => toast.id !== action.payload);
    },
  },
});

export const { showToast, removeToast } = toastSlice.actions;
export default toastSlice.reducer;