import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../utils/axios";
import axios from "axios";
import { toast } from "react-toastify";

// Signup

export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await API.post("/user/signup", formData);

      toast.success("Signup successful!");

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      return { token: res.data.token, user: res.data.user };
    } catch (error) {
      const msg = error.response?.data?.message || "Signup failed!";
      toast.error(msg);
      return rejectWithValue(msg);
    }
  }
);


// Login

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await API.post("/user/login", formData);

      toast.success("Login successful!");

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      return { token: res.data.token, user: res.data.user };
    } catch (error) {
      console.log(error);
      const msg = error.response?.data?.message || "Login failed!";
      toast.error(msg);
      return rejectWithValue(msg);
    }
  }
);


const authSlice = createSlice({
  name: "auth",

  // Load from localStorage correctly
  initialState: {
    user: JSON.parse(localStorage.getItem("user")) || null,
    token: localStorage.getItem("token") || "",
  },

  reducers: {
    logout: (state) => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      state.user = null;
      state.token = "";
    }
  },

  extraReducers: (builder) => {
    builder.addCase(signupUser.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    });

    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    });
  }
});

export const fetchProfile = createAsyncThunk(
  "profile/fetchProfile",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("/profile");
      return res.data.user;  // backend returns { user: {...} }
    } catch (error) {
      const msg = error?.response?.data?.error || "Failed to load profile";
      toast.error(msg);
      return rejectWithValue(msg);
    }
  }
);

export const { logout } = authSlice.actions;
export default authSlice.reducer;
