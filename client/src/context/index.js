import React, { createContext, useContext, useReducer } from 'react';

// Initial state for posts
const initialPostsState = [];

// Create context
const PostsContext = createContext();

// Posts reducer
const postsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_POSTS':
      if (typeof action.payload === 'function') {
        // Call the function with the current state to merge old and new posts
        return action.payload(state);
      }
      // Otherwise, just set the posts directly
      return action.payload;
    case 'ADD_POST':
      return [action.payload, ...state];
    case 'UPDATE_POST':
      return state.map(post => post._id === action.payload._id ? action.payload : post);
    case 'DELETE_POST':
      return state.filter(post => post._id !== action.payload); 
    case 'RESET_POSTS':
      return [];
    default:
      return state;
  }
};

// PostsProvider component to provide posts state and dispatch
export const PostsProvider = ({ children }) => {
  const [posts, dispatch] = useReducer(postsReducer, initialPostsState);

  return (
    <PostsContext.Provider value={{ posts, dispatch }}>
      {children}
    </PostsContext.Provider>
  );
};

// Custom hook to use the PostsContext
export const usePosts = () => useContext(PostsContext);
