import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, removeTodo, updateTodo, setScript} from "../features/todoSlice";


function Todos() {
  const todos = useSelector((state) => state.todoReducer.todos);
  const dispatch = useDispatch();

  const [editId, setEditId] = useState(null);
  const [updatedText, setUpdatedText] = useState("");
  const [scriptScreen, setScriptScreen] = useState(false);
  const [id, setId] = useState(null);
  const [text, setText] = useState("");
  const [inputScript, setInputScript] = useState("");

  useEffect(() => {
    if (todos.length === 0) {
      dispatch(addTodo("Example Todo"));
    }
  }, [dispatch, todos.length]);

  const handleUpdate = (todo) => {
    setEditId(todo.id);
    setUpdatedText(todo.text);
  };

  const saveUpdate = (e) => {
    e.preventDefault();
    dispatch(updateTodo({ id: editId, text: updatedText }));
    setEditId(null);
    setUpdatedText("");
  };

  const handleScript = (todo) => {
    setScriptScreen(!scriptScreen);
    setId(todo.id);
    setText(todo.text);
    setInputScript(todo.script || "");
  };

  const saveScript = (e)=>{
    dispatch(setScript({ id: id, script: inputScript })); 
    setScriptScreen(false);
  }
  

  return (
    <>
      {scriptScreen == false ? (
        <ul className="list-none flex flex-wrap flex-col items-center justify-center mt-12 gap-4">
          {todos.map((todo) => (
            <li
              onClick={() => handleScript(todo)}
              className="w-[500px] bg-gradient-to-b from-slate-700/80 to-gray-800/90 rounded-3xl p-6 text-white shadow-lg shadow-indigo-500/40 backdrop-blur-lg flex items-center justify-between transition-all duration-300 ease-in-out hover:scale-105"
              key={todo.id}
            >
              {editId === todo.id ? (
                <form
                  onSubmit={saveUpdate}
                  className="flex items-center space-x-4 w-full"
                >
                  <input
                    className="w-full bg-zinc-800 rounded-full border border-gray-600 text-white py-2 px-4 focus:ring-2 focus:ring-indigo-400 outline-none transition-all duration-200 ease-in-out"
                    value={updatedText}
                    onChange={(e) => setUpdatedText(e.target.value)}
                  />
                  <button
                    type="submit"
                    className="text-white bg-green-600 py-2 px-4 rounded-full hover:bg-green-700 transition-all duration-300"
                  >
                    Save
                  </button>
                </form>
              ) : (
                <>
                  <div className="text-lg leading-tight font-gobold flex-1 text-white break-words">
                    {todo.text}
                  </div>
                  <div className="flex items-center space-x-2 ml-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleUpdate(todo);
                      }}
                      className="text-white bg-blue-500 py-2 px-4 rounded-full hover:bg-blue-600 transition-all duration-300"
                    >
                      Edit
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        dispatch(removeTodo(todo.id));
                      }}
                      className="text-white bg-red-500 py-2 px-4 rounded-full hover:bg-red-600 transition-all duration-300"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                      </svg>
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-3xl text-black mt-4">TODO : {text}</h1>
          
          <textarea
          value={inputScript}
          onChange={(e)=>setInputScript(e.target.value)}
            className="w-[600px] h-[300px] bg-black text-white rounded-lg p-4 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 outline-none resize-none overflow-y-scroll"
            placeholder="Edit your text here"
          />
          <button
          onClick={()=>saveScript()}
            type="submit"
            className="mt-4 px-6 py-2 text-white bg-indigo-600 hover:bg-indigo-700 rounded-full transition-all duration-300"
          >
            Save
          </button>
        </div>
      )}
    </>
  );
}

export default Todos;
