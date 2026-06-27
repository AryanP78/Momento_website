console.log("Store loaded");
import { configureStore } from "@reduxjs/toolkit";

import postsReducer from "../features/posts/postsSlice";
import authReducer from "../features/auth/authSlice";

console.log("postsReducer:", postsReducer);
console.log("authReducer:", authReducer);

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    auth: authReducer,
  },
});

console.log(store.getState());
