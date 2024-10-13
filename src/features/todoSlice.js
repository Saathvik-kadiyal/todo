import { createSlice, nanoid } from "@reduxjs/toolkit";

const loadTodosFromLocalStorage = () => {
  const savedTodos = localStorage.getItem("todos");
  return savedTodos ? JSON.parse(savedTodos) : [];
};

const saveTodosToLocalStorage = (todos) => {
  localStorage.setItem("todos", JSON.stringify(todos));
};

const initialState = {
  todos: loadTodosFromLocalStorage(),
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      const todo = {
        id: nanoid(),
        text: action.payload,
        script: "",
      };
      state.todos.push(todo);
      saveTodosToLocalStorage(state.todos);
    },
    removeTodo: (state, action) => {
      state.todos = state.todos.filter((each) => each.id !== action.payload);
      saveTodosToLocalStorage(state.todos);
    },
    updateTodo: (state, action) => {
      const { id, text } = action.payload; // We get the id and the new text
      const todo = state.todos.find((each) => each.id === id); // Find the todo by id
      if (todo) {
        todo.text = text; // Update the text of the todo
      }
      saveTodosToLocalStorage(state.todos);
    },
    setScript: (state, action) => {
      const { id, script } = action.payload;
      const todo = state.todos.find((each) => each.id === id);
      if (todo) {
        todo.script = script; // Update the script for the specific todo
      }
      saveTodosToLocalStorage(state.todos);
    },
  },
});

export const { addTodo, removeTodo, updateTodo, setScript } = todoSlice.actions;

export default todoSlice.reducer;
