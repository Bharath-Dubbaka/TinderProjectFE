import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
   name: "requests",
   initialState: [],
   reducers: {
      allRequests: (state, action) => {
         return action.payload;
      },
   },
});

export const { allRequests } = requestSlice.actions;
export default requestSlice.reducer;
