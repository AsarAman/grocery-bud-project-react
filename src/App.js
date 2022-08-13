import React, { useEffect, useState } from "react";
import Alert from './Alert'
import List from './List'

const getLocalStorage = () => {
  let list = localStorage.getItem('list');
  if (list) {
    return (list = JSON.parse(localStorage.getItem('list')));
  } else {
    return [];
  }
};

const App = () =>{
  const [name, setName] = useState('')
  const [list, setList] = useState(getLocalStorage())
  const [editing, setEditing] = useState(false)
  const [editId, setEditId] = useState(null)
  const [alert, setAlert] = useState({show:false, type:'', msg:''})

  const handleSubmit = (e) =>{
    e.preventDefault();
    if(!name){
      showAlert(true,'success', 'Please enter value')

    }
  else  if(name && editing){
      setList(
        list.map((item)=>{
          if(item.id === editId){
            return {...item, title:name}
          }
          return item;
        })
      )

      setEditing(false)
      setEditId(null)
      setName('')
      showAlert(true, 'success', 'value changed')
     

    }
    else{
      showAlert(true, 'success', 'item added')
      const newItem = {id: new Date().getTime().toString(), title:name}
      
        setList([...list, newItem])
        setName('')
      
      
    }
    

  }
  const showAlert = (show = false, type='' , msg='')=>{
    setAlert({show,type,msg})

  }
  const deleteItem = (id) =>{
    
    setList(
      list.filter((item)=> item.id !== id)
    )
    showAlert(true, 'success','item deleted')
  }
  const editItem = (id) =>{
    const specificItem = list.find((item)=> item.id === id)
    setEditing(true)
    setEditId(id)
    setName(specificItem.title)
  }
  const clearList = () =>{
    showAlert(true, 'success','empty list')
    setList([]);
  }
  useEffect(()=>{
    localStorage.setItem('list',JSON.stringify(list))

  },[list])



  return(
    <main className="p-4 mb-5 sm:w-96 mx-auto">
    <div className="p-4 flex flex-col items-center justify-center mt-10 shadow-lg shadow-gray-400 ">
      <form onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} clearAlert={showAlert}/>}
        <h1 className="capitalize text-2xl text-center mb-5">Grocery Bud</h1>
        <input className=" outline-none px-1 w-48  bg-gray-200 rounded-lg " value={name} onChange={(e)=> setName(e.target.value)}/>
        <button className="bg-indigo-500 px-3 text-white  text-center rounded-lg ml-2" type="submit">{editing ?'Edit':'Submit'}</button>
        
        
      </form>
      {list.length > 0 && 
       <div>
        <List items={list} deleteItem={deleteItem} editItem={editItem}/>
        <button className="bg-indigo-500 text-white px-4 py-2 mt-5 ml-24 rounded-xl" onClick={clearList} type="button">Clear All</button>
      </div>
    

      
      
      
      
      }
     
    </div>
    </main>

  
  )

}


export default App