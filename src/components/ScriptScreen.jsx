import React from 'react'
import { useSelector, useDispatch } from "react-redux";

function ScriptScreen() {


const todos = useSelector((state) => state.todoReducer.todos);
  const dispatch = useDispatch();

  const handle = (todos)=>{
    {
      
    }
  }


  return (
    <>
    <button onClick={()=>handle()}>click</button></>
  )
}

export default ScriptScreen