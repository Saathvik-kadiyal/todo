import { createSlice, nanoid } from "@reduxjs/toolkit";

// Load ideas from local storage
const loadIdeasFromLocalStorage = () => {
  const savedIdeas = localStorage.getItem("ideas");
  return savedIdeas ? JSON.parse(savedIdeas) : [{ id: nanoid(), note: "enter your ideas" }];
};

// Save ideas to local storage
const saveIdeasToLocalStorage = (ideas) => {
  localStorage.setItem("ideas", JSON.stringify(ideas));
};

const initialState = {
  ideas: loadIdeasFromLocalStorage(), // Load from local storage initially
};

export const ideaSlice = createSlice({
  name: 'idea',
  initialState,
  reducers: {
    addIdea: (state, action) => {
      const idea = {
        id: nanoid(),
        note: action.payload,
        script: "",
      };
      state.ideas.push(idea);
      saveIdeasToLocalStorage(state.ideas); // Save to local storage after adding an idea
    },
    removeIdea: (state, action) => {
      state.ideas = state.ideas.filter(each => each.id !== action.payload);
      saveIdeasToLocalStorage(state.ideas); // Save to local storage after removing an idea
    },
    setScriptIdea: (state, action) => {
        const { id, script } = action.payload;
        const ideas = state.ideas.find((each) => each.id === id);
        if (ideas) {
          ideas.script = script; // Update the script for the specific todo
        }
        saveIdeasToLocalStorage(state.ideas);
      },
  }
});

export const { addIdea, removeIdea,setScriptIdea } = ideaSlice.actions;

export default ideaSlice.reducer;
