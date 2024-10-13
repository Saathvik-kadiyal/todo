import { combineReducers } from "@reduxjs/toolkit";
import todoReducer from '../features/todoSlice'
import docReducer from '../features/docsSlice'
import ideaReducer from '../features/ideaSlice'

export default combineReducers({
todoReducer,
docReducer,
ideaReducer
})