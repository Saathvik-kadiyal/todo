import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addIdea } from '../features/ideaSlice';

function AddIdeas() {
    const [input, setInput] = useState('');
    const dispatch = useDispatch();

    const addIdeaHandler = (e) => {
        e.preventDefault();
        dispatch(addIdea(input));
        setInput('');
    };

    return (
        <>
            <div 
            className="border-gray-900"
            >
                <form 
                  onSubmit={addIdeaHandler} 
                  className="space-x-3 mt-12 flex justify-center items-center"
                >
                    <div className="relative w-2/5 flex items-center justify-center rounded-full py-2 px-4 bg-slate-400">
                        <label 
                          htmlFor="ideaInput" 
                          className={`absolute left-6 top-1/2 transform -translate-y-1/2 text-indigo-800 transition-all duration-200 ease-in-out ${
                            input ? "text-sm -top-2" : ""
                          }`}
                        >
                          Enter your Ideas
                        </label>

                        <input
                            id="ideaInput"
                            type="text"
                            className="w-[400px] bg-transparent text-base outline-none text-indigo-800 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                        />

                        <button
                            type="submit"
                            className="text-white border py-2 px-4 focus:outline-none rounded-full text-lg"
                        >
                            +
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default AddIdeas;
