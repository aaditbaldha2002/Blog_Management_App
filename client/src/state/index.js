import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  user: null,
  token: null,
  posts: [],
  viewPart:"Posts",
  side:null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.side=action.payload.side;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
      state.side=null;
    },
    setFriends: (state, action) => {
      if (state.user) {
        state.user.friends = action.payload.friends;
      } else {
        console.error("user friends non-existent :(");
      }
    },
  },
});

export const adminSlice= createSlice({
  name:"admin",
  initialState,
  reducers:{

    setUserView:(state)=>{
      state.viewPart="Users";
    },

    setPostsView:(state)=>{
      state.viewPart="Posts";
    },

    setPostAnalyticsView:(state)=>{
      state.viewPart="PostsAnalytics";
    },

  }
});

export const { setMode, setLogin, setLogout, setFriends} = authSlice.actions;
export const {setUserView, setPostsView,setPostAnalyticsView }=adminSlice.actions;
export const authReducer=authSlice.reducer;
export const adminReducer=adminSlice.reducer;
