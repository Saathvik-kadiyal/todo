import React, { useState, useEffect } from "react";
import { FaRegLightbulb } from "react-icons/fa"; // Importing the lightbulb icon
import { useSelector, useDispatch} from "react-redux";
import { addIdea, removeIdea, setScriptIdea  } from "../features/ideaSlice";

function IdeasList() {
  const ideas = useSelector((state) => state.ideaReducer.ideas);
  const dispatch = useDispatch();

  const [scriptScreen, setScriptScreen] = useState(false);
  const [id, setId] = useState(null);
  const [text, setText] = useState("");
  const [inputScript, setInputScript] = useState("");



  useEffect(() => {
    if (ideas.length === 0) {
      dispatch(addIdea("Example Idea"));
    }
  }, [dispatch, ideas.length]);


  const handleScript = (each) => {
    setScriptScreen(!scriptScreen);
    setId(each.id);
    setText(each.note);
    setInputScript(each.script || "");
  };

  const saveScript = () => {
    dispatch(setScriptIdea({ id: id, script: inputScript }));
    setScriptScreen(false);
  };

  return (
    <>
      {scriptScreen == false ? (
        <div className="mt-12 flex flex-col gap-6 items-center justify-center">
          {ideas.map((each) => (
            <div
              key={each.id}
              className="relative w-[500px] bg-gradient-to-b from-slate-700/80 to-gray-800/90 rounded-3xl p-6 text-white shadow-lg shadow-indigo-500/40 backdrop-blur-lg flex items-center justify-between transition-all duration-300 ease-in-out hover:scale-105"
            >
              <div onClick={() => handleScript(each)} className="flex items-center gap-4">
                <FaRegLightbulb size={30} className="text-yellow-400" />
                <p className="w-full text-lg leading-tight font-gobold overflow-hidden break-words whitespace-normal">
                  {each.note}
                </p>
              </div>
              <button
                className="ml-4 bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700 transition-all duration-300 ease-in-out"
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch(removeIdea(each.id));
                }}
              >
                X
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-3xl text-black mt-4 mb-2">IDEA : {text}</h1>

          <textarea
            value={inputScript}
            onChange={(e) => setInputScript(e.target.value)}
            className="w-[600px] h-[300px] bg-black text-white rounded-lg p-4 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 outline-none resize-none overflow-y-scroll"
            placeholder="Edit your Script"
          />
          <button
            onClick={() => saveScript()}
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

export default IdeasList;
