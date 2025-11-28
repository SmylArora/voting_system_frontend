import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../utils/axios";
import { toast } from "react-toastify";

// Fetch Profile
export const fetchProfile = createAsyncThunk(
  "profile/fetchProfile",
  async (_, { rejectWithValue }) => {
    try {
      const res = await API.get("/profile");
      return res.data.user;
    } catch (error) {
      const msg = error?.response?.data?.error || "Failed to load profile";
      toast.error(msg);
      return rejectWithValue(msg);
    }
  }
);

// Update Profile
export const updateProfile = createAsyncThunk(
  "profile/updateProfile",
  async (data, { rejectWithValue }) => {
    try {
      const res = await API.put("/profile/update", data);
      toast.success("Profile Updated Successfully");
      return res.data.user;
    } catch (error) {
      const msg = error?.response?.data?.error || "Update failed";
      toast.error(msg);
      return rejectWithValue(msg);
    }
  }
);

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    loading: false,
    user: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default profileSlice.reducer;
