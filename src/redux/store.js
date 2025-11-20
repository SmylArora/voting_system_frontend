import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import candidateReducer from "./candidateSlice";
import voteReducer from "./voteSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    candidates: candidateReducer,
    vote: voteReducer
  },
});
