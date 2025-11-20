import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../utils/axios";

// Signup
export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async (formData) => {
    const res = await API.post("/user/signup", formData);
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.user));

    return { token: res.data.token, user: res.data.user };
  }
);

// Login
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (formData) => {
    const res = await API.post("/user/login", formData);

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.user));

    return { token: res.data.token, user: res.data.user };
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

export const { logout } = authSlice.actions;
export default authSlice.reducer;
