import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: JSON.parse(localStorage.getItem('journal_read_queue')) || [],
};

const readQueueSlice = createSlice({
  name: 'readQueue',
  initialState,
  reducers: {
    addToQueue: (state, action) => {
      const article = action.payload;
      const exists = state.items.find(item => item.url === article.url);
      if (!exists) {
        state.items.push(article);
      }
    },
    removeFromQueue: (state, action) => {
      const url = action.payload;
      state.items = state.items.filter(item => item.url !== url);
    },
    clearQueue: (state) => {
      state.items = [];
    },
  },
});

export const { addToQueue, removeFromQueue, clearQueue } = readQueueSlice.actions;

export default readQueueSlice.reducer;
