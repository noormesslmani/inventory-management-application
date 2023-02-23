import React from 'react';


const Button=({label, type, styles, handleClick=null})=>{
    return(
        <button type={type} className={`text-white px-4 py-2 rounded-md ${styles}`}  onClick={handleClick}>
            {label}
        </button>
    )
}

export default Button;