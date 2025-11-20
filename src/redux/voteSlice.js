import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../utils/axios";

export const voteCandidate = createAsyncThunk(
  "vote/cast",
  async (candidateId) => {
    const res = await API.post(`/candidates/vote/${candidateId}`);
    return res.data;
  }
);

const voteSlice = createSlice({
  name: "vote",
  initialState: {
    msg: ""
  },
  extraReducers: (builder) => {
    builder.addCase(voteCandidate.fulfilled, (state, action) => {
      state.msg = action.payload.message;
    });
  }
});

export default voteSlice.reducer;
