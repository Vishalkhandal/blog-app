import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  posts: [],
}

const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    addPost: (state, action) => {
        state.posts.unshift(action.payload); //add to the top
    },
    editPost: (state, action) => {
        const { id, updatedPost } = action.payload;
        const index = state.posts.findIndex((post) => post.id === id);
        if(index !== -1) {
          state.posts[index] = {...state.posts[index], ...updatedPost};
        }
    },
    deletePost: (state, action) => {
      const id = action.payload;
      state.posts = state.posts.filter((post) => post.id !== id);
    },
    setPost: (state, action) => {
      state.posts = action.payload; // Replace posts with fetched data
    }
  },
});

export const {addPost, editPost, deletePost, setPost} = blogSlice.actions;

export const selectPosts = (state) => state.blog.posts;

export default blogSlice.reducer;
