import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

API.interceptors.request.use((req) => {
  const profile = JSON.parse(localStorage.getItem("profile"));

  if (profile?.token) {
    req.headers.Authorization = `Bearer ${profile.token}`;
  }

  return req;
});

export const fetchPosts = () => API.get("/posts");

export const createPost = (newPost) => API.post("/posts", newPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const updatePost = (id, updatedPost) =>
  API.patch(`/posts/${id}`, updatedPost);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);

export const signIn = (formData) => API.post("/auth/signin", formData);

export const signUp = (formData) => API.post("/auth/signup", formData);
