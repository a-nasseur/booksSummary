import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit'


const summarySlice = createSlice({
  name: 'summaries',
  initialState: {
    summaries: <Summary[]> []
  },
  reducers: {
    getAllSummaries: (state, action) => {
      // Inserting date from data base in the intial load
      state.summaries = [...action.payload];
    },

    addSummary: (state, action: PayloadAction<Summary>) => {
      // updading the state after inserting new summary
      state.summaries.unshift(action.payload);
    },

    deleteSummary: (state, action) => {
      // deleting data by filtering data that matches id out of the state
      state.summaries = state.summaries.filter(elem => elem.id !== action.payload);
    },
    searchSummary: (state, action) => {
      state.summaries = state.summaries.filter(summary => summary.title.toLocaleLowerCase().startsWith(action.payload));
    }
  }
});

export const { getAllSummaries, deleteSummary, addSummary, searchSummary } = summarySlice.actions;

export default summarySlice.reducer;