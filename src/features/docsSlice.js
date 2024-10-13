import { createSlice, nanoid } from "@reduxjs/toolkit";

// Function to load docs from localStorage
const loadDocsFromLocalStorage = () => {
  const savedDocs = localStorage.getItem("docs");
  return savedDocs ? JSON.parse(savedDocs) : [{ id: nanoid(), details: "enter your notes here" }];
};

// Function to save docs to localStorage
const saveDocsToLocalStorage = (docs) => {
  localStorage.setItem("docs", JSON.stringify(docs));
};

const initialState = {
  docs: loadDocsFromLocalStorage(),
};

export const docSlice = createSlice({
  name: "doc",
  initialState,
  reducers: {
    addDocs: (state, action) => {
      const doc = {
        id: nanoid(),
        details: action.payload,
      };
      state.docs.push(doc);
      saveDocsToLocalStorage(state.docs); // Save the updated state to localStorage
    },
    removeDoc: (state, action) => {
      state.docs = state.docs.filter((each) => each.id !== action.payload);
      saveDocsToLocalStorage(state.docs); // Save the updated state to localStorage
    },
  },
});

export const { addDocs, removeDoc } = docSlice.actions;

export default docSlice.reducer;
