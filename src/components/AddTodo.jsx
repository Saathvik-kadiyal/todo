import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo } from '../features/todoSlice';

function AddTodo() {
  const [input, setInput] = useState('');
  const dispatch = useDispatch();

  const addTodoHandler = (e) => {
    e.preventDefault();
    dispatch(addTodo(input));
    setInput('');
  };

  return (
    <form
      onSubmit={addTodoHandler}
      className="flex flex-col items-center space-y-6 mt-12 p-8 bg-gradient-to-b from-slate-600/80 to-gray-800/90 backdrop-blur-lg rounded-3xl w-[400px] mx-auto shadow-lg shadow-indigo-500/40 ring-4 ring-indigo-500/50"
    >
      <input
        type="text"
        className="w-[320px] bg-gray-800 rounded-full border border-gray-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-3 px-6 leading-8 transition-all duration-300 ease-in-out shadow-lg shadow-indigo-500/30"
        placeholder="Enter a Task"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        type="submit"
        className="w-[320px] text-white bg-indigo-500 py-3 px-6 rounded-full hover:bg-indigo-600 transition-all duration-300 ease-in-out shadow-lg shadow-indigo-500/40 focus:outline-none focus:ring-4 focus:ring-indigo-900 text-lg"
      >
        Add Todo
      </button>
    </form>
  );
}

export default AddTodo;
