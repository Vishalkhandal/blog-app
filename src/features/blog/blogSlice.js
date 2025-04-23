import { createSlice } from '@reduxjs/toolkit';
import { posts } from '../../models/posts';

const blogSlice = createSlice({
  name: 'blog',
  initialState: {
    posts: posts,
  },
  reducers: {
    addPost: (state, action) => {
        state.posts.unshift(action.payload); //add to the top
    }
  },
});

export const {addPost} = blogSlice.actions;

export const selectPosts = (state) => state.blog.posts;

export default blogSlice.reducer;
