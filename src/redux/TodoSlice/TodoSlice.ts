import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../../screens/Todo';

export interface TodoState {
  todos: Todo[];
  selectedtodo: Todo | null;
}

const initialState: TodoState = {
  todos: [],
  selectedtodo: null,
};

export const TodoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<Todo>) => {
      state.todos.push(action.payload);
    },
    handleDelete: (state, action: PayloadAction<number>) => {
      state.todos = state.todos.filter(todo => todo.id !== action.payload);
    },
    getTodobyId: (state, action: PayloadAction<number>) => {
      state.selectedtodo =
        state.todos.find(todo => todo.id === action.payload) || null;
    },
    handleEdit: (
      state,
      action: PayloadAction<{
        id: number;
        title: string;
        description: string;
      }>,
    ) => {
      const { description, id, title } = action.payload;
      const eachtodo = state.todos.find(todo => todo.id === id);
      if (eachtodo) {
        eachtodo.tododesc = description;
        eachtodo.todotitle = title;
      }
    },
    handleTodoComplete: (
      state,
      action: PayloadAction<{ id: number; completed: boolean }>,
    ) => {
      const { completed, id } = action.payload;
      const eachtodo = state.todos.find(todo => todo.id === id);
      if (eachtodo) {
        eachtodo.isCompleted = completed;
      }
    },
  },
});
// Action creators are generated for each case reducer function
export const { addTodo, handleDelete, getTodobyId, handleEdit,handleTodoComplete } =
  TodoSlice.actions;

export default TodoSlice.reducer;
