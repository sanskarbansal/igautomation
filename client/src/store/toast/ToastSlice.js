import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  queue: [],
  current: null,
};

const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    enqueue(state, action) {
      // action.payload: { id?, message, severity, autoHideDuration, anchorOrigin }
      const payload = action.payload;
      const id = payload.id || `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
      state.queue.push({ id, ...payload });
    },
    showNext(state) {
      if (!state.current && state.queue.length > 0) {
        state.current = state.queue.shift();
      }
    },
    dismissCurrent(state) {
      state.current = null;
    },
    clearQueue(state) {
      state.queue = [];
      state.current = null;
    },
  },
});

export const { enqueue, showNext, dismissCurrent, clearQueue } = toastSlice.actions;

export default toastSlice.reducer;
