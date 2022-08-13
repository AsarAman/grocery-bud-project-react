import React, { useEffect } from 'react'

const Alert = ({msg,type,clearAlert,list}) => {
   useEffect(() => {
    const timeout = setTimeout(() => {
      clearAlert();
    }, 3000);
    return () => clearTimeout(timeout);
  }, [list]);

 
  return (
    <p className= "text-center text-indigo-600">{msg}</p>
  )
}

export default Alert