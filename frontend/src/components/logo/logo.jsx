import React from 'react';


const Logo=({size=''})=>{
    return(
        <p className={`text-6xl text-secondary-color font-chango p-10 box-border ${size}`}>
            Logo
        </p>
    )
}

export default Logo;