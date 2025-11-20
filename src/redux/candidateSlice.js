import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../utils/axios";

export const fetchCandidates = createAsyncThunk(
  "candidates/fetch",
  async () => {
    const res = await API.get("/candidate/allcandidates");
    console.log(res, "response");
    return res.data.candidates;
  }
);

export const fetchVoteCount = createAsyncThunk(
  "candidates/voteCount",
  async () => {
    const res = await API.get("/candidates/vote/count");
    return res.data;
  }
);

const candidateSlice = createSlice({
  name: "candidates",
  initialState: {
    list: [],
    voteCount: []
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCandidates.fulfilled, (state, action) => {
      state.list = action.payload;
    });
    builder.addCase(fetchVoteCount.fulfilled, (state, action) => {
      state.voteCount = action.payload;
    });
  }
});

export default candidateSlice.reducer;
