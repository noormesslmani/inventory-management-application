import React from 'react';


const Button=({label, type='', styles, handleClick=null, disabled=false})=>{
    return(
        <button 
        disabled={disabled} 
        type={type} 
        className={`cursor-pointer text-sm sm:text-base px-3 text-white py-2 rounded-md ${styles}`}  onClick={handleClick}
        >
        {label}
        </button>
    )
}

export default Button;