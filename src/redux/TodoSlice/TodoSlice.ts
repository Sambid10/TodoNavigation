import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Todo } from '../../screens/Todo';
export interface TodoState {
  todos: Todo[];
  selectedtodo: Todo | null;
}

const initialState: TodoState = {
  todos: [],
  selectedtodo: null,
};

const saveToStorage = async (todos: Todo[]) => {
  try {
    await AsyncStorage.setItem('todos', JSON.stringify(todos));
  } catch (err) {
    console.error(err);
  }
};

export const loadFromStorage = async (): Promise<Todo[]> => {
  try {
    const todosString = await AsyncStorage.getItem('todos');
    return todosString ? JSON.parse(todosString) : [];
  } catch (err) {
    console.error(err);
    return [];
  }
};

export const TodoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<Todo>) => {
      state.todos.push(action.payload);
      saveToStorage(state.todos); 
    },
    handleDelete: (state, action: PayloadAction<number>) => {
      state.todos = state.todos.filter(todo => todo.id !== action.payload);
      saveToStorage(state.todos); 
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
      }>
    ) => {
      const { id, title, description } = action.payload;
      const eachtodo = state.todos.find(todo => todo.id === id);
      if (eachtodo) {
        eachtodo.todotitle = title;
        eachtodo.tododesc = description;
        saveToStorage(state.todos); 
      }
    },
    handleTodoComplete: (
      state,
      action: PayloadAction<{ id: number; completed: boolean }>
    ) => {
      const { id, completed } = action.payload;
      const eachtodo = state.todos.find(todo => todo.id === id);
      if (eachtodo) {
        eachtodo.isCompleted = completed;
        saveToStorage(state.todos); 
      }
    },
    setFromStorage: (state, action: PayloadAction<Todo[]>) => {
      state.todos = action.payload;
    },
  },
});

export const {
  addTodo,
  handleDelete,
  getTodobyId,
  handleEdit,
  handleTodoComplete,
  setFromStorage
} = TodoSlice.actions;

export default TodoSlice.reducer;
