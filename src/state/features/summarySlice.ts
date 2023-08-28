import { createSlice } from '@reduxjs/toolkit';


const summarySlice = createSlice({
  name: 'summaries',
  initialState: {
    summaries: <Summary[]> []
  },
  reducers: {
    getAllSummaries: (state, action) => {
      // Inserting date from data base in the intial load
      state.summaries = [...action.payload]
    },

    addSummary: (state, action) => {
      // updading the state after inserting new summary
      state.summaries.unshift(action.payload)
    },

    deleteSummary: (state, action) => {
      // deleting data by filtering data that matches id out of the state
      state.summaries = state.summaries.filter(elem => elem.id !== action.payload);
    }
  }
});

export const { getAllSummaries, deleteSummary, addSummary } = summarySlice.actions;

export default summarySlice.reducer;