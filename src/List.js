import React from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa';
const List = ({items, deleteItem, editItem}) => {
    return(
        <div className='mt-5'>
            {items.map((item)=>{
                const {id, title} = item
                return (
                    <article className='flex items-center justify-between bg-gray-100 w-64 mt-5 px-1 py-1 mr-4 rounded-xl' key={id}>
                        <p>{title}</p>
                        <div className='flex gap-3'>
                            <button className='' onClick={()=> editItem(id)}>
                                <FaEdit size={15} />
                            </button>
                            <button onClick={()=> deleteItem(id) }>
                                <FaTrash/>
                            </button>
                        </div>
                    </article>
                )
            })}
        </div>
    )
}

export default List