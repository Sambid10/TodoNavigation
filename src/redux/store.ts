import { configureStore } from '@reduxjs/toolkit'
import TodoSlice from './TodoSlice/TodoSlice'

export const store = configureStore({
  reducer: TodoSlice,
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch