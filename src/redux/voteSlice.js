import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../utils/axios";
import { toast } from "react-toastify";
import { toPadding } from "chart.js/helpers";

export const voteCandidate = createAsyncThunk(
  "vote/cast",
  async (candidateId, { rejectWithValue }) => {
    try {
      const res = await API.post(`/candidate/vote/${candidateId}`);
      if(res.status===200){
        toast.success("Vote Casted Sucessfully");
      }
      return res.data;
    } catch (error) {
        const msg = error.response?.data?.message || "Signup failed!";
        toast.error(msg);
      // Return the message from API for rejected action
      return rejectWithValue(error.response?.data?.message || "Vote failed");
    }
  }
);

const voteSlice = createSlice({
  name: "vote",
  initialState: { msg: "" },
  extraReducers: (builder) => {
    builder.addCase(voteCandidate.fulfilled, (state, action) => {
      state.msg = action.payload.message;
    });
    builder.addCase(voteCandidate.rejected, (state, action) => {
      state.msg = action.payload; // API error message
    });
  }
});

export default voteSlice.reducer;
