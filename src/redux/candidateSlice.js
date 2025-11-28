import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import API from "../utils/axios";

// Fetch all candidates
export const fetchCandidates = createAsyncThunk(
  "candidates/fetch",
  async () => {
    const res = await API.get("/candidate/allcandidates");
    return res.data.candidates;
  }
);

// Fetch vote count for charts
export const fetchVoteCount = createAsyncThunk(
  "candidates/voteCount",
  async () => {
    const res = await API.get("/candidate/vote/count");
    return res.data;
  }
);

// ADD candidate
export const addCandidate = createAsyncThunk(
  "candidates/add",
  async (data, { rejectWithValue }) => {
    try {
      const res = await API.post("/candidate/newcandidate", data);
       if (res.status === 200) {
        toast.success("Candidate Created  Sucessfully");
      }
      return res.data.candidate;
     

    } catch (error) {
      const msg = error.response?.data?.message || "Signup failed!";
      toast.error(msg);
      return rejectWithValue(msg);
    }

  }
);

// UPDATE candidate
export const updateCandidate = createAsyncThunk(
  "candidates/update",
  async ({ id, data} , {rejectWithValue}) => {
    try {
      const res = await API.put(`/candidate/${id}`, data);
      if (res.status === 200) {
        toast.success("Candidate Updated Sucessfully");
      }
      console.log(res, "response");
      return res?.data;

    } catch (error) {
      console.log(error);
      const msg = error?.response?.data?.message|| "Something went Wrong";
      toast.error(msg);
      return rejectWithValue(msg);

    }

  }
);

// DELETE candidate
export const deleteCandidate = createAsyncThunk(
  "candidates/delete",
  async (id,{rejectWithValue}) => {
    try {
    const resp = await API.delete(`/candidate/${id}`);
      if (resp.status === 200) {
        toast.success("Candidate Deleted Sucessfully");
      }
    return id;
    
    }catch (error) {
      const msg = error.response?.data?.message || "Something Went Wrong";
      toast.error(msg);
      return rejectWithValue(msg);
    }
   
  }
);

const candidateSlice = createSlice({
  name: "candidates",
  initialState: {
    list: [],
    voteCount: [],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    // FETCH
    builder.addCase(fetchCandidates.fulfilled, (state, action) => {
      state.list = action.payload;
    });

    // VOTE COUNT
    builder.addCase(fetchVoteCount.fulfilled, (state, action) => {
      state.voteCount = action.payload;
    });

    // ADD
    builder.addCase(addCandidate.fulfilled, (state, action) => {
      state.list.push(action.payload);
    });

    // UPDATE
    builder.addCase(updateCandidate.fulfilled, (state, action) => {
      state.list = state.list.map((c) =>
        c._id === action.payload._id ? action.payload : c
      );
    });

    // DELETE
    builder.addCase(deleteCandidate.fulfilled, (state, action) => {
      state.list = state.list.filter((c) => c._id !== action.payload);
    });
  },
});

export default candidateSlice.reducer;
