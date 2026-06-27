import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../../api";

export const createPost = createAsyncThunk(
  "posts/createPost",

  async (newPost) => {
    const { data } = await api.createPost(newPost);

    return data;
  },
);
export const likePost = createAsyncThunk("posts/likePost", async (id) => {
  const { data } = await api.likePost(id);
  return data;
});

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const { data } = await api.fetchPosts();
  return data;
});
export const deletePost = createAsyncThunk("posts/deletePost", async (id) => {
  await api.deletePost(id);
  return id;
});
export const updatePost = createAsyncThunk(
  "posts/updatePost",
  async ({ id, updatedPost }) => {
    const { data } = await api.updatePost(id, updatedPost);
    return data;
  },
);

const postsSlice = createSlice({
  name: "posts",

  initialState: {
    posts: [],
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
      })

      .addCase(likePost.fulfilled, (state, action) => {
        state.posts = state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post,
        );
      })

      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })

      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(createPost.fulfilled, (state, action) => {
        state.posts.push(action.payload);
      })

      .addCase(updatePost.fulfilled, (state, action) => {
        state.posts = state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post,
        );
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.posts = state.posts.filter((post) => post._id !== action.payload);
      });
  },
});

export default postsSlice.reducer;
