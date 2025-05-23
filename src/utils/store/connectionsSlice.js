import { createSlice } from "@reduxjs/toolkit";

const connectionsSlice = createSlice({
   name: "connections",
   initialState: [],
   reducers: {
      addedConnections: (state, action) => {
         // Replace the entire connections array with new data
         return action.payload;
      },
      removeConnection: (state, action) => {
         // Optional: Add ability to remove a connection
         return state.filter((connection) => connection._id !== action.payload);
      },
      clearConnections: (state) => {
         // Optional: Clear all connections
         return [];
      },
   },
});

export const { addedConnections, removeConnection, clearConnections } =
   connectionsSlice.actions;

export default connectionsSlice.reducer;
