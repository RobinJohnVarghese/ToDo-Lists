import React from 'react'
import './Todo.css'
import { useState,useRef,useEffect } from 'react'
import {IoMdDoneAll} from "react-icons/io";
import {AiFillEdit} from "react-icons/ai"
import {AiFillDelete} from "react-icons/ai";

function Todo() {
    const [todo,setTodo]=useState('');
    const [todos,setTodos]=useState([]);
    const [editid,setEditID] = useState(0)

    const addTodo=()=>{
        if (todo.trim()!==""  ){
        setTodos([...todos,{list:todo , id:Date.now(),status:false}]);
        console.log(todos);
        setTodo('');
        }
            
        if (editid){
           const editTodo = todos.find((todo)=>todo.id === editid) 
           const updateTodo = todos.map((to)=>to.id === editTodo.id
           ? (to = {id : to.id, list : todo})
           : (to = {id : to.id, list : to.list}))
           setTodos(updateTodo)
           setEditID(0)
           setTodo("")

        }
        
    };
    const handleSubmit=(e)=>{
        e.preventDefault();
    }
    const inputRef = useRef("null")
    useEffect(()=>{
        inputRef.current.focus()
    });
    const onDelete =(id)=>{
        setTodos(todos.filter((to) =>to.id !== id))
    }
    const onComplete =(id)=>{
        let complete = todos.map((list)=>{
            if (list.id === id){
            return({...list,status : !list.status})
            }
            return list
        })
        setTodos(complete)
    }
    const onEdit=(id)=>{
          const editTodo = todos.find((to)=> to.id === id)
          setTodo(editTodo.list)
          setEditID(editTodo.id)
    }


  return (
    <div className='container'>
        
        <h1>ToDo App</h1>
        <form className='form-group' onSubmit={handleSubmit}>
            <input type="text" value={todo} ref={inputRef} className='form-control' placeholder="Enter Your todo"  onChange={(event)=>setTodo(event.target.value)}/>
            <button onClick={addTodo}>{editid ? 'EDIT' : 'ADD'}</button>
            <br/>
        </form>
        <div className='list'>
                <ul>{
                    todos.map((to)=>(
                    <li className='list-item-list' id={to.status ? "list-item" :""}>{to.list}
                    <span className='icons'>
                        <IoMdDoneAll className='list-icons' id="complete" title='Complete'onClick={()=>onComplete(to.id)}/>
                        <AiFillEdit className='list-icons' id="edit" title='Edit' onClick={()=>onEdit(to.id)}/>
                        <AiFillDelete className='list-icons' id="delete" title='Delete' onClick={()=>onDelete(to.id)}/>
                    </span></li>))
                    }
                </ul>
            </div>
    </div>
  )
}

export default Todo