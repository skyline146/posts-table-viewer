import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";
// import { sortArrayByType } from "../utils/sort-array";
import { Post } from "../ts";

interface PostsState {
  posts: Post[];
}

const initialState: PostsState = {
  posts: [],
};

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    loadPosts: (state, action: PayloadAction<Post[]>) => {
      state.posts = action.payload;
    },

    // sortPosts: (state, action: PayloadAction<string>) => {
    //   switch (action.payload) {
    //     case "id": {
    //       state.posts = state.posts.sort((a, b) => a.id - b.id);
    //       break;
    //     }
    //     case "title": {
    //       state.posts = sortArrayByType(state.posts, "title");
    //       break;
    //     }
    //     case "body": {
    //       state.posts = sortArrayByType(state.posts, "body");
    //       break;
    //     }
    //   }
    // },
  },
});

export const { loadPosts } = postsSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.posts.posts;

export default postsSlice.reducer;
