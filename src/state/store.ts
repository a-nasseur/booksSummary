import { configureStore } from "@reduxjs/toolkit";
import summaryReducer from "./features/summarySlice";


//Global store
export const store = configureStore({
  reducer: {
    //reducers are defined here
    summary: summaryReducer,
  },
});


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch